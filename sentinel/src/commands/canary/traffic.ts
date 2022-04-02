/* eslint-disable max-lines-per-function */
import {Command} from '@oclif/core'
const inquirer = require('inquirer')
import api from '../../lib/api.js'

export default class Traffic extends Command {
  static description = 'Changes the amount of traffic going to the canary'

  static examples = [
    'sentinel canary traffic',
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
        type: 'input',
        name: 'trafficPercentage',
        message: 'What percentage of traffic do you want to route to the canary?',
        validate(input: string) {
          if (+input >= 0 && +input <= 100) return true

          throw new Error('Please provide a number between 0 and 100')
        },
      },
      {
        type: 'confirm',
        name: 'changeTraffic',
        message: 'Are you sure you want to change the traffic to your canary deployment?',
        default: false,
      },
    ])

    if (answers.changeTraffic) {
      try {
        this.log('Changing canary traffic rules...')
        const response: any = await api.canaryTraffic(answers)
        this.log(response.data)
      } catch (error: any) {
        this.log(error.message)
      }
    }
  }
}
