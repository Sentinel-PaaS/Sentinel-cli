/* eslint-disable max-lines-per-function */
import {Command, Flags} from '@oclif/core'
const inquirer = require('inquirer')

export default class Promote extends Command {
  static description = 'Promotes the canary version of the application to full production and removes the previous production application'

  static examples = [
    'sentinel canary promote',
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
        name: 'promote',
        message: 'Are you sure you want to promote the canary version to production? This will remove the previous production version of the application',
        default: false,
      },
    ])
    if (answers.promote) {
      //let response = api.promoteCanary(answers)
      //if (response.data.status === 200) {
      //  this.log('The canary has been promoted to production for answers.appName')
      //} else {
      //    this.log('There is no canary for this application')
      //}
      console.log('Promoting canary..')
    } else {
      console.log('Canceling canary promotion..')
    }
  }
}
