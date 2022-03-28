/* eslint-disable max-len */
/* eslint-disable max-lines-per-function */
import { Command, Flags } from '@oclif/core'
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
    const answers = await inquirer.prompt([
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
          // TODO: validate with regex
          //Check that it is a valid digit
          if (input.length === 0 || +input > 0) return true
          throw new Error('Please provide a valid port number.')
        },
      },
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
        name: 'hostName',
        message: 'What is the host name of your application? ex: helloworld.com',
        validate(input: string) {
          if (input.length > 0 && !input.includes(' ')) return true

          throw new Error('Please provide a valid host name.')
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
          // TODO: validate with regex
          if (input.length > 0 && !input.includes(' ')) return true

          throw new Error('Please provide a database password with no spaces.')
        },
      },
      {
        type: 'input',
        name: 'dbHost',
        message: 'Please enter the database host name: ',
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

    // eslint-disable-next-line unicorn/consistent-function-scoping
    function hasDatabase(answers: any) {
      return function () {
        return [answers.dbUserName, answers.dbPassword, answers.createSchemaOnDeploy]
      }
    }

    const finalConfirmation = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'deployConfirmation',
        message: `Please confirm the information you entered is correct:
          Application Image: ${answers.appImage}
          Port: ${answers.appImagePort || 'N/A'}
          Application Name: ${answers.appName}
          Host Name: ${answers.hostName}
          Application Has Database: ${answers.hasDatabase}
          Database Username: ${answers.dbUsername || 'N/A'}
          Database Password: ${answers.dbPassword || 'N/A'},
          Database Name: ${answers.dbName || 'N/A'},
          Database Host: ${answers.dbHost || 'N/A'},
          Create schema on deploy: ${answers.createSchemaOnDeploy || 'N/A'},
          Path to SQL File: ${answers.pathToDbFile || 'N/A'}`,
      },
    ])

    //FIXME: There is a bug in this block of code that throws a mysterious error. Further investigation needed
    
    // if (finalConfirmation.deployConfirmation && answers.createSchemaOnDeploy) {
    //   const filePath = answers.pathToDbFile.split('/')
    //   // const dbFileName = filePath[filePath.length - 1]

    //   // const file = fs.readFileSync('/..'.repeat(numOfFoldersToGetToHome) + '/' + answers.pathToDbFile, 'utf-8', (err: any, data: any) => {
    //   //   if (err) throw err
    //   //   // console.log(data)
    //   // })
    //   let file = ""
    //   console.log('Deploying application...')
    //   // const sqlResponse: any = await api.uploadSQL(answers, file, dbFileName)
    //   const response: any = await api.deployApplication(answers)
    //   console.log(response)
    //   // if (response.status === 200 && sqlResponse.status === 200) {
    //   //   this.log('Make sure your host name points to this ip address: ' + response.data)
    //   // } else {
    //   //   this.error('An error occurred')
    //   // }
    // } else if (finalConfirmation.deployConfirmation && (!answers.hasDatabase || !answers.createSchemaOnDeploy)) {
    //   //console.log('Deploying application...')
    //   //let response = await api.deployApplication(answers)
    //   // if (response.data.status === 200) {
    //   //   this.log("Make sure your host name points to this ip address: " response.data.ipAddress)
    //   // } else {
    //   //    this.error("An error occurred")
    //   // }
    // }
  }
}
