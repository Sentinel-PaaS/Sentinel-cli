import {Command, Flags} from '@oclif/core'
const inquirer = require('inquirer')

export default class Remove extends Command {
  static description = 'Remove an application from production. This is not meant for canary deployments'

  static examples = [
    '<%= config.bin %> <%= command.id %> -a <myapp>',
  ]

  static flags = {
    // flag with a value (-n, --name=VALUE)
    app: Flags.string({char: 'a', description: 'application name', required: true}),
  }

  // static args = [{name: 'file'}]

  public async run(): Promise<void> {
    const {flags} = await this.parse(Remove)
    let answers = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'removeApp',
        message: 'Are you sure you want to remove ' + flags.app + ' from production?',
        default: false,
      },
    ])
    //if (answers.removeApp) {
    //  // let response = await api.removeApp(flags.app)
    //  if (response.data.status === 200) {
    //    this.log(flags.app + ' has been removed from production')
    //  } else {
    //    this.error('Please verify you entered the correct application name')
    //  }
    //}
  }
}
