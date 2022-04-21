# Welcome to Sentinel 
A platform as a service with built in canary deployments

## Getting Started
Ensure that you have an AWS account and your account has the correct permissions for creating EC2 instances, security groups, and IAM policies/roles. Sentinel will pull your AWS credentials via a shared configuration
and credentials file. 
More info about that [here](https://registry.terraform.io/providers/hashicorp/aws/latest/docs#shared-configuration-and-credentials-files) and [here](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html).

Currently we can only deploy in the `us-east-2` region. This is where all cloud resources will be provisioned see issue [#10](https://github.com/Sentinel-PaaS/Sentinel-CLI/issues/10)

You'll need to create a key pair in your aws account with the exact name of `ssh-kp`. This will be used for setting up the Sentinel API server. Be sure to save it locally on your machine at `~/.ssh/`.

You'll also need to install [terraform](https://learn.hashicorp.com/tutorials/terraform/install-cli) and [ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html)

Install the sentinel [npm package](https://www.npmjs.com/package/@sentinel-paas/sentinel-cli) 

`npm i @sentinel-paas/sentinel-cli -g`

Next, run `sentinel init` 

This is a global command that will spin up the necessary infrastructure in AWS. All Sentinel commands will be communicating with this server. Keep an eye on the output and expect to see a prompt asking you to connect via SSH to the Sentinel server. 

Once this is done you're good to go. Run `sentinel --help` for more commands or see our CLI [documentation](sentinel/README.md) on how to deploy your applications and more.

---
Developed by:

- [Samantha Lipari](https://github.com/samlipari)
- [Michael Fatigati](https://github.com/MFatigati)
- [Drew Sessler](https://github.com/dsessler7)
- [Brendan Leal](https://github.com/Brendan-Leal) 
