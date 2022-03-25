import {Command, Flags} from '@oclif/core'
const inquirer = require('inquirer')

export default class App extends Command {
  static description = 'Removes an application from production.'

  static examples = [
    '<%= config.bin %> <%= command.id %> -a <myapp>',
  ]

  //static flags = {
  //  // flag with a value (-n, --name=VALUE)
  //  app: Flags.string({char: 'a', description: 'application name', required: true}),
  //}

  // static args = [{name: 'file'}]

  public async run(): Promise<void> {
    //const {flags} = await this.parse(Remove)
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
        name: 'removeApp',
        message: 'Are you sure you want to remove this application from production?',
        default: false,
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
