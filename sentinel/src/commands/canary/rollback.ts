/* eslint-disable max-lines-per-function */
import {Command, Flags} from '@oclif/core'
const inquirer = require('inquirer')
import api from '../../lib/api.js'

export default class Rollback extends Command {
  static description = 'Removes the canary version of the application and directs all user traffic back to the original production version.'

  static examples = [
    'sentinel canary rollback',
  ]

  public async run(): Promise<void> {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'appName',
        message: 'What is the name of your application?',
        validate(input: string) {
          // TODO: validate with regex
          if (input.length > 0 && !input.includes(' ')) return true

          throw new Error('Please provide an application name with no spaces.')
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
      this.log('Removing canary version of the application...')
      const response: any = await api.rollbackCanary(answers)
      this.log(response.data)
    } else {
      this.log('Canceling rollback of canary...')
    }
  }
}
