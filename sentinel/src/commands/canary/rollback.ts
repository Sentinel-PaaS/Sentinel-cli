/* eslint-disable max-lines-per-function */
import {Command, Flags} from '@oclif/core'
const inquirer = require('inquirer')
import api from '../../lib/api.js'

export default class Rollback extends Command {
  static description = 'Removes the canary version of the application and directs all user traffic back to the original production version.'

  static examples = [
    'sentinel canary rollback',
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
        name: 'rollback',
        message: 'Are you sure you want to rollback the canary version?',
        default: false,
      },
    ])

    if (answers.rollback) {
      try {
        this.log('Removing canary version of the application...')
        const response: any = await api.rollbackCanary(answers)
        this.log(response.data)
      } catch (error: any) {
        this.log(error.message)
      }
    } else {
      this.log('Canceling rollback of canary...')
    }
  }
}
