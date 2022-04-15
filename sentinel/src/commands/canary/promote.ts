/* eslint-disable max-lines-per-function */
import {Command, Flags} from '@oclif/core'
const inquirer = require('inquirer')
import api from "../../lib/api.js";
export default class Promote extends Command {
  static description = 'Promotes the canary version of the application to full production and removes the previous production application'

  static examples = [
    'sentinel canary promote',
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
        name: 'promote',
        message: 'Are you sure you want to promote the canary version to production? This will remove the previous production version of the application',
        default: false,
      },
    ])

    if (answers.promote) {
      try {
        this.log('Promoting canary..')
        const response: any = await api.promoteCanary(answers)
        this.log(response.data)
      } catch (error: any) {
        this.log(error.message)
      }
    } else {
      console.log('Canceling canary promotion..')
    }
  }
}
