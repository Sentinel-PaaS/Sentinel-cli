# Welcome to Sentinel 
Before you start ensure that you have an AWS account and your user has the correct IAM policy 
attached for provisioning infrastructure. Sentinel will pull your AWS credentials via a shared configuration
and credentials file. 
More info [here](https://registry.terraform.io/providers/hashicorp/aws/latest/docs#shared-configuration-and-credentials-files) and [here](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html)

Currently we can only deploy in the `us-east-2` region. This is where all resources will be provisioned see issue [#10](https://github.com/Sentinel-PaaS/Sentinel-CLI/issues/10)

You'll also need to install terraform

Get the sentinel npm package `npm install -g sentinel-cli`

[Note to self: link to the official npm package site] 

As of right now you'll need to copy the terraform directory and it's file into your projects root directory. See issue [#8](https://github.com/Sentinel-PaaS/Sentinel-CLI/issues/8).

In your project's root directory run `sentinel init` 