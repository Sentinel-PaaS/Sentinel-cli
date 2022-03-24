import { Command, Flags } from '@oclif/core'
const inquirer = require('inquirer')

export default class Canary extends Command {
  static description = 'These commands are used to manage canary deployments for your application'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {

    deploy: Flags.boolean({char: 'd', description: 'Make a canary deployment'}),
    traffic: Flags.boolean({ char: 't', description: 'Increase traffic to the canary deployment' }),
    promote: Flags.boolean({ char: 'p', description: 'Promote the canary deployment to production' }),
    rollback: Flags.boolean({ char: 'r', description: 'Rollback the canary deployment' }),
  }

  // static args = [{ name: 'file' }]

  public async run(): Promise<void> {
    const { flags } = await this.parse(Canary)
    let answers

    if (flags.deploy) {
      answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'canaryImage',
          message: 'What is the Docker Hub image name for the canary? ex: username/image_name',
          validate(input: string) {
            // TODO: validate with regex
            if (input.length > 0) return true

            throw new Error('Please provide a valid Docker Hub image name.')
          },
        },
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
      ])
      //api.canaryDeploy(answers)
    } else if (flags.traffic) {
      //TODO: Show current percentage of traffic routing to canary?
      answers = await inquirer.prompt([
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
          choices: ['5%', '10%', '20%'],
        },
      ])
      //let response = api.canaryTraffic(answers)
      //if (response.data.status === 200) {
      //  this.log('Canary traffic has been increased to answers.trafficPercentage')
      //} else {
      //    this.log('There is no canary for this application')
      //}
    } else if (flags.promote) {
      answers = await inquirer.prompt([
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
          type: 'confirm',
          name: 'promote',
          message: 'Are you sure you want to promote the canary version to production?',
          default: false,
        },
      ])
      //let response = api.promoteCanary(answers)
      //if (response.data.status === 200) {
      //  this.log('The canary has been promoted to production for answers.appName')
      //} else {
      //    this.log('There is no canary for this application')
      //}
    } else if (flags.rollback) {
      answers = await inquirer.prompt([
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
          type: 'confirm',
          name: 'rollback',
          message: 'Are you sure you want to rollback the canary version?',
          default: false,
        },
      ])
      //let response = api.rollbackCanary(answers)
      //if (response.data.status === 200) {
      //  this.log('The canary deployment has been rolled back for answers.appName')
      //} else {
      //    this.log('There is no canary for this application')
      //}
    } else {
      this.error('Please provide a flag')
    }
    console.log(JSON.stringify(answers))
  }
}
