/* eslint-disable max-lines-per-function */
import { Command, Flags } from '@oclif/core'
const inquirer = require('inquirer')
//const api = require('../lib/api.ts')
// import { api } from "../lib/api.js";


export default class Deploy extends Command {
  static description = 'Initiates a canary deployment'

  static examples = [
    '$ sentinel canary deploy'
  ]

  public async run(): Promise<void> {
    let answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'appImage',
        message: 'What is the Docker Hub image name for your production application? ex: username/image_name',
        validate(input: string) {
          // TODO: validate with regex
          if (input.length > 0) return true

          throw new Error('Please provide a valid Docker Hub image name.')
        },
      },
      {
        type: 'input',
        name: 'appImagePort',
        message: 'If your production application image exposes a port, please specify the port number: ',
        validate(input: string) {
          // TODO: validate with regex
          //Check that it is a valid digit
          if (input.length === 0 || +input > 0) return true
          throw new Error('Please provide a valid port number.')
        },
      },
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
        name: 'canaryImagePort',
        message: 'If your canary image exposes a port, please specify the port number: ',
        validate(input: string) {
          // TODO: validate with regex
          if (input.length === 0 || +input > 0) return true
          throw new Error('Please provide a valid port number.')
        },
      },
      {
        type: 'input',
        name: 'hostName',
        message: 'What is the host name of your application? ex: helloworld.com',
        validate(input: string) {
          // TODO: validate with regex
          if (input.length > 0) return true

          throw new Error('Please provide a host name.')
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
      {
        type: 'confirm',
        name: 'hasDatabase',
        message: 'Does your application use a postgres database?',
        default: false,
        when(answers: any) {
          return hasDatabase(answers)
        },
      },
      {
        type: 'input',
        name: 'dbUsername',
        message: 'Please enter the database user name: ',
        when(answers: any) {
          return answers.hasDatabase
        },
        validate(input: string) {
          // TODO: validate with regex
          if (input.length > 0) return true

          throw new Error('Please provide a database user name.')
        },
      },
      {
        type: 'input',
        name: 'dbPassword',
        message: 'Please enter the database password: ',
        when(answers: any) {
          return answers.hasDatabase
        },
        validate(input: string) {
          // TODO: validate with regex
          if (input.length > 0) return true

          throw new Error('Please provide a database password.')
        },
      },
      {
        type: 'list',
        name: 'trafficPercentage',
        message: 'What percentage of traffic do you want to route to the canary?',
        choices: ['5%', '10%', '20%'],
        require: true,
      },
    ])

    function hasDatabase(answers: any) {
      return function () {
        return [answers.dbUserName, answers.dbPassword]
      }
    }

    const finalConfirmation = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'deployConfirmation',
        message: `Please confirm the information you entered is correct:
          Application Image: ${answers.appImage}
          Application Port: ${answers.appImagePort || 'N/A'}
          Canary Image: ${answers.canaryImage}
          Canary Port: ${answers.canaryImagePort || 'N/A'}
          Application Name: ${answers.appName}
          Host Name: ${answers.hostName}
          Application Has Database: ${answers.hasDatabase}
          Database Username: ${answers.dbUsername || 'N/A'}
          Database Password: ${answers.dbPassword || 'N/A'},
          Percentage of traffic routed to canary: ${answers.trafficPercentage}`,
      },
    ])
  
    if (finalConfirmation.deployConfirmation) {
      this.log('Deploying canary...')
      //let response = api.canaryDeploy(answers)
      //if (response.data.status === 200) {
      //  this.log('The canary has been deployed')
      //} else {
      //    this.log('Something went wrong')
      //}
    } else {
      this.log('Canceling canary deployment...')
    }
    //api.canaryDeploy(answers)
  }
}
