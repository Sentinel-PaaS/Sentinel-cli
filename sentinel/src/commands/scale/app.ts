/* eslint-disable max-lines-per-function */
import {Command} from '@oclif/core'
const inquirer = require('inquirer')
import api from '../../lib/api'

export default class App extends Command {
  static description = 'Scale an application up or down'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
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
        type: 'input',
        name: 'scaleNumber',
        message: 'How many instances of your application would you like to run?',
        validate(input: string) {
          // TODO: validate with regex
          if (+input && +input > 0) return true

          throw new Error('Please provide a number greater than 0 to scale your application to.')
        },
      },
      {
        type: 'confirm',
        name: 'scaleApp',
        message: 'Are you sure you want to scale this application?',
        required: true,
      },
    ])

    if (answers.scaleApp) {
      this.log(`Scaling ${answers.appName} to ${answers.scaleNumber}...`)
      const response: any = await api.scaleApp(answers)
      this.log(response.data)
    }
  }
}
