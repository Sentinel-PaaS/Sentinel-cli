import {Command} from '@oclif/core'
const inquirer = require('inquirer')
import api from '../../lib/api'

export default class App extends Command {
  static description = 'Removes an application from production.'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]
  public async run(): Promise<void> {
    let servicesList
    let appNamesList

    try {
      let response = await api.getApps()
      servicesList = response.data
    } catch (error: any) {
      this.log(error.message)
    }

    servicesList = servicesList.filter((service: any) => service.appName && service.serviceName.endsWith('production'))
    appNamesList = servicesList.map((service: any) => service.appName)

    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'appName',
        message: 'Choose your application: ',
        choices: appNamesList,
        require: true,
      },
      {
        type: 'confirm',
        name: 'removeApp',
        message: 'Are you sure you want to remove this application from production?',
        required: true,
      },
    ])

    if (answers.removeApp) {
      try {
        this.log(`Removing ${answers.appName} from production...`)
        const response: any = await api.removeApp(answers)
        this.log(response.data)
      } catch (error: any) {
        this.log(error.message)
      }
    }
  }
}
