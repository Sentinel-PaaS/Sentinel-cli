import { Command } from '@oclif/core'
const childProcess = require('child_process')
const { spawn } = require('child_process')
import api from '../lib/api.js'
let path = ''

export default class Init extends Command {
  static description = 'Initialize Sentinel infrastructure'

  static examples = [
    '$ sentinel init',
  ]

  static flags = {}

  static args = []

  public async run(): Promise<void> {
    try {
      let user: string = await this.execute('echo $USER')
      user = user.replace('\n', '')
      path = `/home/${user}/.sentinel/config`

      console.log(await this.getConfigScript(user));
      
      console.log(await this.executeConfigScript(user))

      this.log('Initializing cloud infrastructure. Please stand by.')

      await this.terraformInit(path)

      await this.terraformApply(path)

      await this.executeAnsible(path)

      await api.setURL(path)

      await api.startDockerSwarm()

      this.log('Successfully initialized cloud infrastructure')

      // TODO: prompt user to create password that will be used to authenticate subsequent requests
      // POST to our api endpoint
    } catch (error) {
      console.log(error)
      this.error('An error ocurred while initializing your infrastructure.')
    }
  }

  private async getConfigScript(user: string): Promise<string> {
    const scriptPath = `/home/${user}/.sentinel/scripts`
    return new Promise((resolve, reject) => {
      spawn('mkdir', ['-p', scriptPath])

      const args = [
        '-P',
        `${scriptPath}`,
        'https://raw.githubusercontent.com/Sentinel-PaaS/cli-configs/main/config.sh'
      ]

      const configs = spawn('wget', args);
      configs.stdout.on("data", (data: any) => {
        console.log(`stdout: ${data}`);
      });

      configs.stderr.on("data", (data: any) => {
        console.log(`stderr: ${data}`);
      });

      configs.on('error', (error: any) => {
        console.log(`error: ${error.message}`);
        reject(error.message)
      });

      configs.on("close", (code: any) => {
        resolve(`Process exited with code ${code}`)
      });
    })
  }

  private async executeConfigScript(user: string): Promise<string> {
    const scriptPath = `/home/${user}/.sentinel/scripts`
    return new Promise((resolve: any, reject: any) => {
      childProcess.exec(`cd ${scriptPath}/ && chmod +x config.sh && ./config.sh`, (err: any, contents: any) => {
        if (err) {
          reject(err)
          return
        }

        resolve(contents)
      })
    })
  }

  private async execute(command: string): Promise<string> {
    return new Promise((resolve, reject) => {
      childProcess.exec(command, (err: any, contents: any) => {
        if (err) {
          reject(err)
          return
        }

        resolve(contents)
      })
    })
  }

  private async terraformInit(path: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const terraformInit = spawn("terraform", [`-chdir=${path}/terraform`, "init", "-input=false"]);
      terraformInit.stdout.on("data", (data: any) => {
        console.log(`stdout: ${data}`);
      });

      terraformInit.stderr.on("data", (data: any) => {
        console.log(`stderr: ${data}`);
      });

      terraformInit.on('error', (error: any) => {
        console.log(`error: ${error.message}`);
        reject(error.message)
      });

      terraformInit.on("close", (code: any) => {
        resolve(`Process exited with code ${code}`)
      });
    })
  }

  private async terraformApply(path: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const terraformApply = spawn("terraform", [`-chdir=${path}/terraform`, "apply", "-input=false", "-auto-approve"]);
      terraformApply.stdout.on("data", (data: any) => {
        console.log(`stdout: ${data}`);
      });

      terraformApply.stderr.on("data", (data: any) => {
        console.log(`stderr: ${data}`);
      });

      terraformApply.on('error', (error: any) => {
        console.log(`error: ${error.message}`);
        reject(error.message)
      });

      terraformApply.on("close", (code: any) => {
        resolve(`Process exited with code ${code}`)
      });
    })
  }

  private async executeAnsible(path: string): Promise<string> {
    // console.log(await this.execute('cd /home/$USER/.sentinel/config/ansible && ansible-playbook -i ./inventory/hosts playbook.yml --fork 1'))

    return new Promise((resolve, reject) => {
      const args = [
        "-i",
        `${path}/ansible/inventory/hosts`,
        `${path}/ansible/playbook.yml`,
        '--fork',
        '1',
      ]
      const options = {
        env: {
          ...process.env,
          ANSIBLE_CONFIG: `${path}/ansible/ansible.cfg`
        }
      }
      this.log(options.env.ANSIBLE_CONFIG)
      const playbook = spawn("ansible-playbook", args, options);

      playbook.stdout.on("data", (data: any) => {
        console.log(`stdout: ${data}`);
      });

      playbook.stderr.on("data", (data: any) => {
        console.log(`stderr: ${data}`);
      });

      playbook.on('error', (error: any) => {
        console.log(`error: ${error.message}`);
        reject(error.message)
      });

      playbook.on("close", (code: any) => {
        resolve(`Process exited with code ${code}`)
      });
    })
  }
}
