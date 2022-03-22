import { Command } from '@oclif/core'
const inquirer = require('inquirer')

export default class Init extends Command {
  static description = 'Initialize Sentinel'

  static examples = [
    '$ sentinel init',
  ]

  static flags = {}

  static args = []

  public async run(): Promise<void> {
    let accessKeys: any = await inquirer.prompt([
      {
        type: 'input',
        name: 'awsAccessKey',
        message: 'Please enter your AWS access key:',
      },
      {
        type: 'input',
        name: 'awsSectetKey',
        message: 'Please enter your secret access key: ',
      },
    ])

  }
}
