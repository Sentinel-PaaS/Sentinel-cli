import {Command} from '@oclif/core'
const inquirer = require('inquirer')
import api from '../../lib/api'

export default class App extends Command {
  static description = 'Removes an application from production.'

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
        type: 'confirm',
        name: 'removeApp',
        message: 'Are you sure you want to remove this application from production?',
        required: true,
      },
    ])

    if (answers.removeApp) {
      this.log(`Removing ${answers.appName} from production...`)
      const response: any = await api.removeApp(answers)
      this.log(response.data)
    }
  }
}
