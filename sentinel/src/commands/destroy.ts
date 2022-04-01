/* eslint-disable max-lines-per-function */
import { Command } from '@oclif/core'
const inquirer = require('inquirer')
const childProcess = require('child_process')
const { spawn } = require('child_process')
import api from '../lib/api.js'

export default class Destroy extends Command {
  static description = 'Destroy the entire Sentinel infrastructure and all of your applications.'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  public async run(): Promise<void> {
    let user: string = await this.execute('echo $USER')
    user = user.replace('\n', '')
    let path = `/home/${user}/.sentinel/config`

    const answers = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'destroyAll',
        message: 'Are you sure you want to destroy all applications and Sentinel? This cannot be undone',
        default: false,
      },
    ])

    if (answers.destroyAll) {
      this.log('Tearing down your applications and Sentinel, please wait this may take a few minutes.')

      try {
        await api.setConfigs(path)
        const response = await api.destroyAll()

        if (response.status === 200) {
          // if (true) {
          await this.terraformDestroy(path)

          // Delete configuration files
          this.execute('rm -rf ~/.sentinel')

          this.log('Successfully destroyed Sentinel and your applications')
        } else {
          this.error('Sorry, something went wrong. Please try again.')
        }
      } catch (error: any) {
        this.log(error)
      }
    }
  }

  private async terraformDestroy(path: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const tfDestroy = spawn("terraform", [`-chdir=${path}/terraform`, "destroy", "-auto-approve"]);
      tfDestroy.stdout.on("data", (data: any) => {
        console.log(`stdout: ${data}`);
      });

      tfDestroy.stderr.on("data", (data: any) => {
        console.log(`stderr: ${data}`);
      });

      tfDestroy.on('error', (error: any) => {
        console.log(`error: ${error.message}`);
        reject(error.message)
      });

      tfDestroy.on("close", (code: any) => {
        resolve(`Process exited with code ${code}`)
      });
    })
  }

  private async execute(command: string): Promise<string> {
    return new Promise((resolve, reject) => {
      childProcess.exec(command, (err: any, contents: any) => {
        if (err) {
          reject(err)
          return
        }

        resolve(contents)
      })
    })
  }
}
