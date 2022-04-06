/* eslint-disable max-len */
/* eslint-disable max-lines-per-function */
import { Command } from '@oclif/core'
const inquirer = require('inquirer')
const inquirerFilePath = require('inquirer-file-path')
const fs = require('fs')
const currentDir = process.cwd().match(/\w+/g)
const numOfFoldersToGetToHome = currentDir ? currentDir.length - 1 : 1

import api from '../lib/api.js'
export default class Deploy extends Command {
  static description = 'Deploy your application'

  static examples = [
    '$ sentinel deploy',
  ]

  public async run(): Promise<void> {
    inquirer.registerPrompt('file', inquirerFilePath)
    let ipConfirm

    try {
      const managerIP = await api.getManagerIP()
      ipConfirm = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'ipConfirmation',
          message: `Please confirm the domain name you want associated with this app resolves to the following IP address before continuing: ${managerIP.data.managerIP}`,
        }
      ])
    } catch (error: any) {
      this.log(error.message)
    }

    if (ipConfirm.ipConfirmation === false) {
      this.error('To continue, you must have a domain name resolving to the provided IP address.')
    }


    const answers = await inquirer.prompt([
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
        message: 'Please provide the registry and repository of your application image. ex: registry/respository',
        validate(input: string) {
          // TODO: validate with regex
          if (input.length > 0) return true

          throw new Error('Please provide a valid registry/repository.')
        },
      },
      {
        type: 'input',
        name: 'appImagePort',
        message: 'If your image exposes a port, please specify the port number: ',
        validate(input: string) {
          if (input.length === 0 || +input > 0) return true
          throw new Error('Please provide a valid port number.')
        },
      },
      {
        type: 'input',
        name: 'hostName',
        message: 'What is the hostname of your application? (ex: helloworld.com)',
        validate(input: string) {
          if (input.length > 0 && !input.includes(' ')) return true

          throw new Error('Please provide a valid hostname.')
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
          if (input.length > 0 && !input.includes(' ')) return true

          throw new Error('Please provide a database name with no spaces.')
        },
      },
      {
        type: 'confirm',
        name: 'createSchemaOnDeploy',
        message: 'Would you like your database schema created on deploy? Choose yes if your code doesn\'t create your database schema and you will provide the .sql file in the next step',
        default: false,
        when(answers: any) {
          return answers.hasDatabase
        },
      },
      {
        type: 'file',
        name: 'pathToDbFile',
        message: 'Please provide the path to your sql file',
        basePath: '/..'.repeat(numOfFoldersToGetToHome),
        when(answers: any) {
          return answers.createSchemaOnDeploy
        },
        validate(input: string) {
          //this validation doesn't work
          if (input.endsWith('.sql')) return true

          throw new Error('Please provide a .sql file')
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
          Port: ${answers.appImagePort || 'N/A'}
          Application Name: ${answers.appName}
          Hostname: ${answers.hostName}
          Application Has Database: ${answers.hasDatabase}
          Database Username: ${answers.dbUsername || 'N/A'}
          Database Password: ${answers.dbPassword || 'N/A'}
          Database Name: ${answers.dbName || 'N/A'}
          Database Host: ${answers.dbHost || 'N/A'}
          Create schema on deploy: ${answers.createSchemaOnDeploy || 'N/A'}
          Path to SQL File: ${answers.pathToDbFile || 'N/A'}`,
      },
    ])

    if (finalConfirmation.deployConfirmation && answers.createSchemaOnDeploy) {
      const filePath = answers.pathToDbFile.split('/')
      const dbFileName = filePath[filePath.length - 1]

      const file: string = fs.readFileSync('/..'.repeat(numOfFoldersToGetToHome) + '/' + answers.pathToDbFile, 'utf-8', (err: any, data: any) => {
        if (err) throw err
      })

      try {
        this.log('Deploying application...')
        const sqlResponse: any = await api.uploadSQL(answers, file, dbFileName)
        const response: any = await api.deployApplication(answers)
        this.log(sqlResponse.data)
        this.log(response.data)
      } catch (error: any) {
        this.log(error.message)
      }
    } else if (finalConfirmation.deployConfirmation && (!answers.hasDatabase || !answers.createSchemaOnDeploy)) {
      try {
        this.log('Deploying application with no database...')
        await api.deployApplication(answers)
      } catch (error: any) {
        this.log(error.message)
      }
    }
  }
}
