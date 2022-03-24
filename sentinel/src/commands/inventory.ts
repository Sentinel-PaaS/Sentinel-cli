import {Command, Flags} from '@oclif/core'
import api from '../lib/api';

export default class Inventory extends Command {
  static description = 'List all deployed applications'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  public async run(): Promise<void> {
    // const response = await api.getInventory()
    // TODO: find a way to neatly display info
    this.log()
  }
}
