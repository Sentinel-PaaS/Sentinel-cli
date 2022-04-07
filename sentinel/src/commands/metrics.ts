/* eslint-disable max-lines-per-function */
import {Command} from '@oclif/core'
const inquirer = require('inquirer')
import api from '../lib/api.js'

export default class Metrics extends Command {
  static description = 'Initialize domains for application metrics.'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  public async run(): Promise<void> {
    let ipConfirm
    try {
      const managerIP = await api.getManagerIP()
      ipConfirm = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'ipConfirmation',
          message: `Before continuing, please confirm you have unique domain names that will be used for your Traefik, Prometheus, and Grafana dashboards\n(e.g., traefik.user.com, prometheus.user.com, grafana.user.com) each pointing to the following IP address: ${managerIP.data.managerIP}`,
        }
      ])
    } catch (error: any) {
      this.log(error.message)
    }

    if (ipConfirm.ipConfirmation === false) {
      this.error('To continue, you must have your domain names resolving to the provided IP address.')
    }

    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'traefikHostName',
        message: 'Please enter the hostname you want to use to access your Traefik proxy dashboard (e.g., traefik.yourdomain.com): ',
      },
      {
        type: 'input',
        name: 'prometheusHostName',
        message: 'Please enter the hostname you want to use to access your Prometheus metrics dashboard (e.g., prometheus.yourdomain.com): ',
      },
      {
        type: 'input',
        name: 'grafanaHostName',
        message: 'Please enter the hostname you want to use to access your Grafana metrics dashboard (e.g., grafana.yourdomain.com): ',
      },
      {
        type: 'input',
        name: 'password',
        message: 'Please enter the password you want to use with these dashboards (your username will be "admin"): ',
        when(answers: any) {
          return answers.traefikHostName || answers.prometheusHostName || answers.grafanaHostName
        },
        validate(input: string) {
          // TODO: validate with regex
          if (input.length > 0) return true

          throw new Error('Please provide a password.')
        },
      },
    ])

    const finalConfirmation = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'domainConfirmation',
        message: `Please confirm the information you entered is correct:
          Traefik Hostname: ${answers.traefikHostName || 'N/A'}
          Prometheus Hostname: ${answers.prometheusHostName || 'N/A'}
          Grafana Hostname: ${answers.grafanaHostName || 'N/A'}
          Password: ${answers.password || 'N/A'}`,
      },
    ])
  
    if (!answers.traefikHostName && !answers.grafanaHostName && !answers.prometheusHostName) {
      this.log('No metrics data entered')
    } else if (finalConfirmation.domainConfirmation) {
      try {
        this.log('Setting up metrics domains...')
        await api.setDomains(answers)
        this.log('Domains Successfully updated')
      } catch (error: any) {
        this.log(error.message)
      }
    } else {
      this.log('Canceling set metrics domains...')
    }
  }
}
