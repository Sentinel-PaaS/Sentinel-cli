/* eslint-disable object-curly-spacing */
import { Command } from '@oclif/core'
const inquirer = require('inquirer')
// const process = require("process");
const childProcess = require("child_process");
// const { spawn } = require("child_process");

export default class Init extends Command {
  static description = 'Initialize Sentinel'

  static examples = [
    '$ sentinel init',
  ]

  static flags = {}

  static args = []

  public async run(): Promise<void> {
    try {
      this.log('Initializing cloud infrastructure. Please wait this may take a few minutes.')

      console.log(await execute('cd ./terraform && terraform init'))

      this.log('Provisioning resources. Please wait a little longer.')

      console.log(await execute('cd ./terraform && terraform apply -auto-approve'))

      // TODO: Secure copy the host file to ec2 at /home/ec2-user/sentinel-api

      this.log('Successfully initializing cloud infrastructure')

      // TODO: prompt user to create password that will be used to authenticate subsequent requests
      // POST to our api endpoint
    } catch (err) {
      console.log(err)
      this.error('An error ocurred while initializing your infrastructure.')
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
