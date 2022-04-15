/* eslint-disable max-lines-per-function */
import {Command} from '@oclif/core'
const inquirer = require('inquirer')
import api from '../../lib/api'

export default class App extends Command {
  static description = 'Scale an application up or down'

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
        type: 'input',
        name: 'scaleNumber',
        message: 'How many instances of your application would you like to run?',
        validate(input: string) {
          // TODO: validate with regex
          if (+input && +input > 0) return true

          throw new Error('Please provide a number greater than 0 to scale your application to.')
        },
      },
      {
        type: 'confirm',
        name: 'scaleApp',
        message: 'Are you sure you want to scale this application?',
        required: true,
      },
    ])

    if (answers.scaleApp) {
      try {
        this.log(`Scaling ${answers.appName} to ${answers.scaleNumber} containers...`)
        const response: any = await api.scaleApp(answers)
        this.log(response.data)
      } catch (error: any) {
        this.log(error.message)
      }
    }
  }
}
