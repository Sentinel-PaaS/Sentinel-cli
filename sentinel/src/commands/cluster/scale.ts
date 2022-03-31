import {Command} from '@oclif/core'
const inquirer = require('inquirer')
import api from '../../lib/api.js'

export default class Scale extends Command {
  static description = 'This command scales your cluster up or down.'

  static examples = [
    'sentinel cluster scale',
  ]

  public async run(): Promise<void> {
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'scaleCluster',
        message: 'Would you like to scale the cluster up or down?',
        choices: ['up', 'down', 'cancel'],
        require: true,
      },
    ])

    if (answers.scaleCluster !== 'cancel') {
      this.log(`Scaling cluster ${answers.scaleCluster}...`)
      const response: any = await api.scaleCluster(answers)
      this.log(response.data)
    } else {
      console.log('Canceling cluster scale')
    }
  }
}
