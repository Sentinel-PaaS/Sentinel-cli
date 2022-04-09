import { Command } from '@oclif/core'
const inquirer = require('inquirer')
import api from '../../lib/api.js'

export default class App extends Command {
  static description = 'Provides deployment information on a specific application'

  static examples = [
    'sentinel inspect app',
  ]

  public async run(): Promise<void> {
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
    ])

    try {
      this.log(`Getting app information for ${answers.appName}...`)
      const response: any = await api.getApp(answers)
      let message = response.data.message
      let serviceInfo = response.data.data
      this.log(message + '\n')
      this.log(`Application Has Canary: ${response.data.hasCanary}\n`)
      serviceInfo.forEach((service: any) => {
        this.log(`Service Name: ${service.serviceName}`)
        this.log(`Service Replicas: ${service.serviceReplicas}`)
        this.log(`Service Tasks:\n `)
        service.servicesTasks.forEach((task: any) => {
          this.log(`\tTask Status: ${task.taskStatus}`)
          this.log(`\tTask Status Timestamp: ${task.taskStatusTimestamp}`)
          this.log(`\tTask Slot: ${task.taskSlot}`)
          this.log(`\tTask Container: ${task.taskContainer}\n`)
          this.log(`\tTask Node ID: ${task.taskNodeID}\n`)
        })
      })
    } catch (error: any) {
      this.log(error.message)
    }
  }
}
