import {Command} from '@oclif/core'
import api from '../../lib/api.js'

export default class Inspect extends Command {
  static description = 'This command allows you to obtain information about the cluster.'

  static examples = [
    'sentinel cluster inspect',
  ]

  public async run(): Promise<void> {
    try {
      this.log('Getting cluster information...')
      const response: any = await api.inspectCluster()
      this.log(response.data)
    } catch (error: any) {
      this.log(error.message)
    }
  }
}
