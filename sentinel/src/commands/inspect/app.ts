import { Command } from '@oclif/core'
const inquirer = require('inquirer')
import api from '../../lib/api.js'

export default class App extends Command {
  static description = 'Provides deployment information on a specific application'

  static examples = [
    'sentinel inspect app',
  ]

  public async run(): Promise<void> {
    let servicesList
    let appNamesList

    try {
      let response = await api.getApps()
      servicesList = response.data
    } catch (error: any) {
      this.log(error.message)
    }

    servicesList = servicesList.filter((service: any) => service.appName && service.serviceName.endsWith('production'))
    appNamesList = servicesList.map((service: any) => service.appName)

    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'appName',
        message: 'Choose your application: ',
        choices: appNamesList,
        require: true,
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
        service.serviceTasks.forEach((task: any) => {
          this.log(`\tTask Status: ${task.taskStatus}`)
          this.log(`\tTask Status Timestamp: ${task.taskStatusTimestamp}`)
          this.log(`\tTask Slot: ${task.taskSlot}`)
          this.log(`\tHost Node Metrics:`)
          this.log(`\t\tDisk Space: ${task.hostNodeMetrics.diskSpace}`)
          this.log(`\t\tMemory Space: ${task.hostNodeMetrics.memorySpace}`)
          this.log(`\t\tCPU Usage Avg Last 10 Mins: ${task.hostNodeMetrics.cpuUsageAvgLast10Minutes}\n`)
        })
      })
    } catch (error: any) {
      this.log(error.message)
    }
  }
}
