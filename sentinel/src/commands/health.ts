import {Command, Flags} from '@oclif/core'
const inquirer = require('inquirer')

export default class Health extends Command {
  static description = 'Specify the name of an application and check its health status.'

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
    ])
    //let response = api.getAppHealth(answers)
    //if (response.data.status === 200) {
    //  this.log('answers.appName is response.data.health')
    //} else {
    //  this.error('Please verify you entered the correct application name')
    //}
  }
}
