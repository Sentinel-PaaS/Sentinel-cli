import { Command } from '@oclif/core'
import api from '../../lib/api'

export default class Inventory extends Command {
  static description = 'List all deployed applications'

  static examples = [
    'sentinel inspect inventory',
  ]

  public async run(): Promise<void> {
    try {
      this.log('Getting inventory...\n')
      const response: any = await api.getApps()

      this.log('Currently deployed apps:')
      response.data.forEach((service: any) => {
        if (service.appName) {
          this.log(`App Name:\t${service.appName}`)
          this.log(`Service Name:\t${service.serviceName}\n`)
        } else {
          this.log(`Service Name:\t${service.serviceName} (Sentinel default)\n`)
        }
      })
    } catch (error: any) {
      this.log(error.message)
    }
  }
}
