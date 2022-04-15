import {Command} from '@oclif/core'
const inquirer = require('inquirer')
import api from '../../lib/api.js'

export default class Logs extends Command {
  static description = 'Provides application logs'

  static examples = [
    'sentinel inspect logs',
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

    servicesList = servicesList.filter((service: any) => service.appName)
    appNamesList = servicesList.map((service: any) => service.serviceName)

    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'appName',
        message: 'Choose your application: ',
        choices: appNamesList,
        require: true,
      },
    ])

    try {
      this.log(`Getting logs for ${answers.appName}...`)
      const response: any = await api.getLogs(answers)
      this.log(response.data)
    } catch (error: any) {
      this.log(error.message)
    }
  }
}
