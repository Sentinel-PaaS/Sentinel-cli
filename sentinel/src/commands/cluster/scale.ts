import {Command, Flags} from '@oclif/core'
const inquirer = require('inquirer')

export default class Scale extends Command {
  static description = 'This command scales your cluster up or down.'

  static examples = [
    'sentinel cluster scale',
  ]

  public async run(): Promise<void> {
    let answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'scaleCluster',
        message: 'Would you like to scale the cluster up or down?',
        choices: ['up', 'down', 'cancel'],
        require: true,
      },
    ])

    if (answers.scaleCluster !== 'cancel') {
      console.log(JSON.stringify(answers))
      //let response = api.scaleCluster(answers)
      //if (response.data.status === 200) {
      //  this.log('The cluster has been scaled ${answers.scaleCluster}')
      //} else {
      //    this.log('Unable to scale at this time. Try again later.')
      //}
    } else {
      console.log('Canceling cluster scale')
    }
  }
}
