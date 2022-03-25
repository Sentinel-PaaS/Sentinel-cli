import {Command, Flags} from '@oclif/core'

export default class Inspect extends Command {
  static description = 'This command allows you to obtain information about the cluster.'

  static examples = [
    'sentinel cluster inspect',
  ]

  public async run(): Promise<void> {
    console.log('Getting cluster information...')
    //let response = await api.inspectCluster()
    //let response = api.getClusterInfo()
    //if (response.data.status === 200) {
    //  this.log('response.data')
    //} else {
    //    this.log('No cluster information available')
    //}
  }
}
