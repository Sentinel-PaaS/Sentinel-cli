import { Command } from '@oclif/core'
const inquirer = require('inquirer')
const childProcess = require('child_process')
const { spawn } = require('child_process')
const fs = require('fs')
import generateAuthToken from '../lib/generateToken'
import api from '../lib/api.js'

export default class Init extends Command {
  static description = 'Initialize Sentinel infrastructure'

  static examples = [
    '$ sentinel init',
  ]

  static flags = {}

  static args = []

  public async run(): Promise<void> {
    try {
      const user: any = process.env.USER
      let path = process.env.HOME + '/.sentinel/config'
      let wgetResult = await this.installWget()
      this.log(wgetResult)
      const userEmail = await this.promptForEmail()

      console.log(await this.getConfigScript())

      console.log(await this.executeConfigScript())

      this.log('Initializing cloud infrastructure. Please stand by.')

      await this.terraformInit(path)

      await this.terraformApply(path)

      this.saveAuthToken(path)

      await this.executeAnsible(path)

      this.log('Almost done, just a few more minutes.')

      await api.initializeCluster(userEmail)

      this.log('Successfully initialized cloud infrastructure')
    } catch (error) {
      console.log(error)
      this.error('An error ocurred while initializing your infrastructure.')
    }
  }

  private async installWget(): Promise<any> {
    // wget is installed so don't install it
    if (await this.execute('echo which wget') !== 'wget not found') {
      return Promise.resolve('wget is already installed')
    } else {
      this.log("Installing wget")
      return new Promise((resolve, reject) => {
        const wget = spawn('brew', ["install", "wget"]);
        wget.stdout.on("data", (data: any) => {
          console.log(`stdout: ${data}`);
        });

        wget.on('error', (error: any) => {
          console.log(`error: ${error.message}`);
          reject(error.message)
        });

        wget.on("close", (code: any) => {
          resolve(`Process exited with code ${code}`)
        });
      })
    }
  }

  private async promptForEmail(): Promise<any> {
    try {
      const email = await inquirer.prompt(
        {
          type: "input",
          name: "email",
          message: "Your applications will automatically be configured with HTTPS using Let's Encrypt.\nAll we need from you is an email address so that we can create the certificates.\nPlease enter it below or see our documentation for more info.\nYour Email: "
        }
      )
      return email
    } catch (error) {
      throw error
    }
  }

  private async getConfigScript(): Promise<string> {
    const scriptPath = process.env.HOME + '/.sentinel/scripts'
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

  private async executeConfigScript(): Promise<string> {
    const scriptPath = `/$HOME/.sentinel/scripts`
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
  private saveAuthToken(path: string): void {
    const token = generateAuthToken()
    try {
      fs.writeFileSync(`${path}/token.txt`, token)
    } catch (err) {
      throw new Error('Could not save auth token')
    }
  }
}
