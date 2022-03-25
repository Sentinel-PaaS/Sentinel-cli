import {Command, Flags} from '@oclif/core'
const inquirer = require('inquirer')

export default class App extends Command {
  static description = 'Provides deployment information on a specific application'

  static examples = [
    'sentinel inspect app',
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
    //let response = api.getApp(answers)
    //if (response.data.status === 200) {
    //  this.log('App information: reponse.data.body')
    //} else {
    //  this.error('Please verify you entered the correct application name')
    //}
    console.log(JSON.stringify(answers))
  }
}
