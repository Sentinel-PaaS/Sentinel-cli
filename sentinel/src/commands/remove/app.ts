import {Command} from '@oclif/core'
const inquirer = require('inquirer')

export default class App extends Command {
  static description = 'Removes an application from production.'

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
          if (input.length > 0 && !input.includes(' ')) return true
          throw new Error('Please provide an application name.')
        },
      },
      {
        type: 'confirm',
        name: 'removeApp',
        message: 'Are you sure you want to remove this application from production?',
        required: true,
      },
    ])

    //if (answers.removeApp) {
    //  // let response = await api.removeApp(answers)
    //  if (response.data.status === 200) {
    //    this.log(answers.app + ' has been removed from production')
    //  } else {
    //    this.error('Please verify you entered the correct application name')
    //  }
    //}
  }
}
