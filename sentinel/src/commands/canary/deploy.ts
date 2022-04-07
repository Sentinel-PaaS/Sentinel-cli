/* eslint-disable max-lines-per-function */
import { Command, Flags } from '@oclif/core'
const inquirer = require('inquirer')
import api from '../../lib/api.js'

export default class Deploy extends Command {
  static description = 'Initiates a canary deployment'

  static examples = [
    '$ sentinel canary deploy'
  ]

  public async run(): Promise<void> {
    let answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'appName',
        message: 'What is the name of your application?',
        validate(input: string) {
          if (input.length > 0 && !input.includes(' ')) return true
          throw new Error('Please provide an application name with no spaces.')
        },
      },
      {
        type: 'input',
        name: 'appImage',
        message: 'Please provide the registry and repository of your production application image. ex: registry/respository',
        validate(input: string) {
          // TODO: validate with regex
          if (input.length > 0) return true

          throw new Error('Please provide a valid registry/repository.')
        },
      },
      {
        type: 'input',
        name: 'appImagePort',
        message: 'If your production application image exposes a port, please specify the port number: ',
        validate(input: string) {
          if (input.length === 0 || +input > 0) return true
          throw new Error('Please provide a valid port number.')
        },
      },
      {
        type: 'input',
        name: 'canaryImage',
        message: 'Please provide the registry and repository of your canary application image. ex: registry/repository',
        validate(input: string) {
          // TODO: validate with regex
          if (input.length > 0) return true
          throw new Error('Please provide a valid registry/repository.')
        },
      },
      {
        type: 'input',
        name: 'canaryImagePort',
        message: 'If your canary image exposes a port, please specify the port number: ',
        validate(input: string) {
          if (input.length === 0 || +input > 0) return true
          throw new Error('Please provide a valid port number.')
        },
      },
      {
        type: 'input',
        name: 'hostName',
        message: 'What is the hostname of your application? ex: helloworld.com',
        validate(input: string) {
          if (input.length > 0 && !input.includes(' ')) return true

          throw new Error('Please provide a hostname.')
        },
      },
      {
        type: 'confirm',
        name: 'hasDatabase',
        message: 'Does your application use a postgres database?',
        default: false,
      },
      {
        type: 'input',
        name: 'dbUsername',
        message: 'Please enter the database user name: ',
        when(answers: any) {
          return answers.hasDatabase
        },
        validate(input: string) {
          if (input.length > 0 && !input.includes(' ')) return true

          throw new Error('Please provide a database user name with no spaces.')
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
          if (input.length > 0 && !input.includes(' ')) return true

          throw new Error('Please provide a database password with no spaces.')
        },
      },
      {
        type: 'input',
        name: 'dbHost',
        message: 'Please enter the host name your application uses to connect to your database: ',
        when(answers: any) {
          return answers.hasDatabase
        },
        validate(input: string) {
          // TODO: validate with regex
          if (input.length > 0 && !input.includes(' ')) return true

          throw new Error('Please provide a database host with no spaces.')
        },
      },
      {
        type: 'input',
        name: 'dbName',
        message: 'Please enter the name of the database: ',
        when(answers: any) {
          return answers.hasDatabase
        },
        validate(input: string) {
          // TODO: validate with regex
          if (input.length > 0 && !input.includes(' ')) return true

          throw new Error('Please provide a database name with no spaces.')
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
    ])

    const finalConfirmation = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'deployConfirmation',
        default: false,
        message: `Please confirm the information you entered is correct:
          Application Name: ${answers.appName}
          Application Image: ${answers.appImage}
          Application Port: ${answers.appImagePort || 'N/A'}
          Canary Image: ${answers.canaryImage}
          Canary Port: ${answers.canaryImagePort || 'N/A'}
          Application Name: ${answers.appName}
          Hostname: ${answers.hostName}
          Application Has Database: ${answers.hasDatabase}
          Database Username: ${answers.dbUsername || 'N/A'}
          Database Password: ${answers.dbPassword || 'N/A'}
          Database Name: ${answers.dbName || 'N/A'}
          Database Host: ${answers.dbHost || 'N/A'}
          Percentage of traffic routed to canary: ${answers.trafficPercentage}`,
      },
    ])
  
    if (finalConfirmation.deployConfirmation) {
      try {
        this.log('Deploying canary...')
        const response: any = await api.canaryDeploy(answers)
        this.log(response.data)
      } catch (error: any) {
        this.log(error.message)
      }
    } else {
      this.log('Canceling canary deployment...')
    }
  }
}
