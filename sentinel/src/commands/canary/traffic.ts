/* eslint-disable max-lines-per-function */
import {Command, Flags} from '@oclif/core'
const inquirer = require('inquirer')

export default class Traffic extends Command {
  static description = 'Changes the amount of traffic going to the canary'

  static examples = [
    'sentinel canary traffic',
  ]

  public async run(): Promise<void> {
    // TODO: Show current percentage of traffic routing to canary?
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
        type: 'list',
        name: 'trafficPercentage',
        message: 'What percentage of traffic do you want to route to the canary?',
        choices: ['5%', '10%', '20%', 'cancel'],
        require: true,
      },
    ])

    //if (answers.trafficPercentage !== 'cancel')
      // let response = api.canaryTraffic(answers)
      // if (response.data.status === 200) {
      //  this.log('Canary traffic has been changed to answers.trafficPercentage')
      // } else {
    //    this.log('There is no canary for this application')
    // }
    //}
    console.log(JSON.stringify(answers))
  }
}
