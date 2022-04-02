import {Command} from '@oclif/core'
const inquirer = require('inquirer')
import api from '../../lib/api.js'

export default class App extends Command {
  static description = 'Provides deployment information on a specific application'

  static examples = [
    'sentinel inspect app',
  ]

  public async run(): Promise<void> {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'appName',
        message: 'What is the name of your application?',
        validate(input: string) {
          if (input.length > 0 && !input.includes(' ')) return true

          throw new Error('Please provide an application name with no spaces.')
        },
      },
    ])

    try {
      this.log(`Getting app information for ${answers.appName}...`)
      const response: any = await api.getApp(answers)
      this.log(response.data)
    } catch (error: any) {
      this.log(error.message)
    }
  }
}
