/* eslint-disable max-lines-per-function */
import {Command, Flags} from '@oclif/core'
const inquirer = require('inquirer')

export default class App extends Command {
  static description = 'Scale an application up or down'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
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
        type: 'input',
        name: 'scaleNumber',
        message: 'How many instances of your application would you like to run?',
        validate(input: string) {
          // TODO: validate with regex
          if (+input && +input > 0) return true

          throw new Error('Please provide a number greater than 0 to scale your application to.')
        },
      },
    ])
    //let response = api.scaleApp(answers)
    //if (response.data.status === 200) {
    //  this.log('Your application has been scaled to: answers.scaleNumber')
    //} else {
    //  this.error('Please verify you entered the correct application name')
    //}
    console.log(JSON.stringify(answers))
  }
}
