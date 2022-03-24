import { Command, Flags } from '@oclif/core'
const inquirer = require('inquirer')
//const api = require('../lib/api.ts')
// import { api } from "../lib/api.js";




export default class Deploy extends Command {
  static description = 'Deploy your application'

  static examples = [
    // '<%= config.bin %> <%= command.id %>',
    '$ sentinel deploy'
  ]

  public async run(): Promise<void> {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'appImage',
        message: 'What is the Docker Hub image name? ex: username/image_name',
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
      {
        type: 'input',
        name: 'hostName',
        message: 'What is the host name of your application?',
        validate(input: string) {
          // TODO: validate with regex
          if (input.length > 0) return true

          throw new Error('Please provide a host name.')
        },
      },
      {
        type: 'input',
        name: 'databaseImage',
        message: 'If your application uses a database, what is the Docker Hub image name? Otherwise press enter',
      },
    ])

    console.log(JSON.stringify(answers))

    // let response = await api.deployApplication(answers)
    // if (response.data.status === 200) {
    //   this.log("Make sure your host name points to this ip address: " response.data.ipAddress)
    // } else {
    //    this.error("An error occurred")
    // }
  }
}
