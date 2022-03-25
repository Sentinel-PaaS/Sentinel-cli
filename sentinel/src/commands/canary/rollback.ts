/* eslint-disable max-lines-per-function */
import {Command, Flags} from '@oclif/core'
const inquirer = require('inquirer')

export default class Rollback extends Command {
  static description = 'Removes the canary version of the application and directs all user traffic back to the original production version.'

  static examples = [
    'sentinel canary rollback',
  ]

  public async run(): Promise<void> {
    let answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'appName',
        message: 'What is the name of your application?',
        validate(input: string) {
          // TODO: validate with regex
          if (input.length > 0) return true

          throw new Error('Please provide an application name.')
        },
      },
      {
        type: 'confirm',
        name: 'rollback',
        message: 'Are you sure you want to rollback the canary version?',
        default: false,
      },
    ])
    if (answers.rollback) {
      //let response = api.rollbackCanary(answers)
      //if (response.data.status === 200) {
      //  this.log('The canary deployment has been rolled back for answers.appName')
      //} else {
      //    this.log('There is no canary for this application')
      //}
      console.log('Removing canary version of the application...')
    } else {
      console.log('Canceling rollback of canary...')
    }
  }
}
