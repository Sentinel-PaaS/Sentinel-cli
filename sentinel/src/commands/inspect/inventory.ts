import {Command, Flags} from '@oclif/core'
import api from '../../lib/api';

export default class Inventory extends Command {
  static description = 'List all deployed applications'

  static examples = [
    'sentinel inspect inventory',
  ]

  public async run(): Promise<void> {
    // const response = await api.getApps()
    // TODO: find a way to neatly display info
    this.log("List of deployed applications")
  }
}
