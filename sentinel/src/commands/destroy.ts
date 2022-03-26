/* eslint-disable max-lines-per-function */
import {Command} from '@oclif/core'
const inquirer = require('inquirer')
const childProcess = require('child_process')

export default class Destroy extends Command {
  static description = 'Destroy the entire Sentinel infrastructure and all of your applications.'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  public async run(): Promise<void> {
    let answers = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'destroyAll',
        message: 'Are you sure you want to destroy all applications and Sentinel? This cannot be undone',
        default: false,
      },
    ])

    if (answers.destroyAll) {
      this.log('Tearing down your applications and Sentinel, please wait this may take a few minutes.')

      // let response = await api.destroyAll()
      if (true/*response.data.status === 200*/) {
        const value = await execute('./sentinel_destroy.sh')

        console.log(value)

        this.log('Successfully destroyed Sentinel and your applications')
      } else {
        this.error('Sorry, something went wrong. Please try again.')
      }
    }
  }
}

async function execute(command: string) {
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