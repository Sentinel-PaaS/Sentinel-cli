oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g sentinel-test-command-line-interface
$ sentinel COMMAND
running command...
$ sentinel (--version)
sentinel-test-command-line-interface/0.0.13 linux-x64 node-v14.18.0
$ sentinel --help [COMMAND]
USAGE
  $ sentinel COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`sentinel canary deploy`](#sentinel-canary-deploy)
* [`sentinel canary promote`](#sentinel-canary-promote)
* [`sentinel canary rollback`](#sentinel-canary-rollback)
* [`sentinel canary traffic`](#sentinel-canary-traffic)
* [`sentinel deploy`](#sentinel-deploy)
* [`sentinel destroy`](#sentinel-destroy)
* [`sentinel help [COMMAND]`](#sentinel-help-command)
* [`sentinel init`](#sentinel-init)
* [`sentinel inspect inventory`](#sentinel-inspect-inventory)
* [`sentinel inspect app`](#sentinel-inspect-app)
* [`sentinel cluster inspect`](#sentinel-cluster-inspect)
* [`sentinel cluster scale`](#sentinel-cluster-scale)
* [`sentinel scale app`](#sentinel-scale-app)
* [`sentinel plugins`](#sentinel-plugins)
* [`sentinel plugins:install PLUGIN...`](#sentinel-pluginsinstall-plugin)
* [`sentinel plugins:inspect PLUGIN...`](#sentinel-pluginsinspect-plugin)
* [`sentinel plugins:install PLUGIN...`](#sentinel-pluginsinstall-plugin-1)
* [`sentinel plugins:link PLUGIN`](#sentinel-pluginslink-plugin)
* [`sentinel plugins:uninstall PLUGIN...`](#sentinel-pluginsuninstall-plugin)
* [`sentinel plugins:uninstall PLUGIN...`](#sentinel-pluginsuninstall-plugin-1)
* [`sentinel plugins:uninstall PLUGIN...`](#sentinel-pluginsuninstall-plugin-2)
* [`sentinel plugins update`](#sentinel-plugins-update)
* [`sentinel remove app`](#sentinel-remove-app)

## `sentinel canary deploy`

```
USAGE
  $ sentinel canary deploy

DESCRIPTION
  Initiates a canary deployment

EXAMPLES
  $ sentinel canary deploy
```

_See code: [dist/commands/canary/](https://github.com/Sentinel-PaaS/Sentinel-CLI/blob/main/sentinel/src/commands/canary/deploy.ts)_

## `sentinel canary promote`

```
USAGE
  $ sentinel canary promote

DESCRIPTION
  Promotes the canary version of the application to full production and removes the previous production application

EXAMPLES
  $ sentinel canary promote
```

_See code: [dist/commands/canary/](https://github.com/Sentinel-PaaS/Sentinel-CLI/blob/main/sentinel/src/commands/canary/promote.ts)_

## `sentinel canary rollback`

```
USAGE
  $ sentinel canary rollback

DESCRIPTION
  Removes the canary version of the application and directs all user traffic back to the original production version.

EXAMPLES
  $ sentinel canary rollback
```

_See code: [dist/commands/canary/](https://github.com/Sentinel-PaaS/Sentinel-CLI/blob/main/sentinel/src/commands/canary/rollback.ts)_

## `sentinel canary traffic`

```
USAGE
  $ sentinel canary traffic

DESCRIPTION
  Changes the amount of traffic going to the canary

EXAMPLES
  $ sentinel canary traffic
```

_See code: [dist/commands/canary/](https://github.com/Sentinel-PaaS/Sentinel-CLI/blob/main/sentinel/src/commands/canary/traffic.ts)_
## `sentinel deploy`

Deploy your application

```
USAGE
  $ sentinel deploy

DESCRIPTION
  Deploy your application

EXAMPLES
  $ sentinel deploy
```

_See code: [dist/commands/deploy.ts](https://github.com/sentinel/sentinel-paas/blob/v0.0.13/dist/commands/deploy.ts)_

## `sentinel destroy`

Destroy the entire Sentinel infrastructure and all of your applications.

```
USAGE
  $ sentinel destroy

DESCRIPTION
  Destroy the entire Sentinel infrastructure and all of your applications.

EXAMPLES
  $ sentinel destroy
```

_See code: [dist/commands/destroy.ts](https://github.com/sentinel/sentinel-paas/blob/v0.0.13/dist/commands/destroy.ts)_

## `sentinel health`

Specify the name of an application and check its health status.

```
USAGE
  $ sentinel health

DESCRIPTION
  Specify the name of an application and check its health status.

EXAMPLES
  $ sentinel health
```

_See code: [dist/commands/health.ts](https://github.com/sentinel/sentinel-paas/blob/v0.0.13/dist/commands/health.ts)_

## `sentinel help [COMMAND]`

Display help for sentinel.

```
USAGE
  $ sentinel help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for sentinel.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.12/src/commands/help.ts)_

## `sentinel init`

Initialize Sentinel

```
USAGE
  $ sentinel init

DESCRIPTION
  Initialize Sentinel

EXAMPLES
  $ sentinel init
```

_See code: [dist/commands/init.ts](https://github.com/sentinel/sentinel-paas/blob/v0.0.13/dist/commands/init.ts)_

## `sentinel inspect inventory`

```
USAGE
  $ sentinel inspect inventory

DESCRIPTION
  List all deployed applications

EXAMPLES
  $ sentinel inspect inventory
```

_See code: [dist/commands/inventory.ts](https://github.com/Sentinel-PaaS/Sentinel-CLI/blob/main/sentinel/src/commands/inspect/inventory.ts)_

## `sentinel inspect app`

```
USAGE
  $ sentinel inspect app

DESCRIPTION
  Provides deployment information on a specific application

EXAMPLES
  $ sentinel inspect app
```

_See code: [dist/commands/inventory.ts](https://github.com/Sentinel-PaaS/Sentinel-CLI/blob/main/sentinel/src/commands/inspect/app.ts)_

## `sentinel cluster inspect`

```
USAGE
  $ sentinel cluster inspect

DESCRIPTION
  This command allows you to obtain information about the cluster.

EXAMPLES
  $ sentinel cluster inspect
```

_See code: [dist/commands/inventory.ts](https://github.com/Sentinel-PaaS/Sentinel-CLI/blob/main/sentinel/src/commands/cluster/inspect.ts)_

## `sentinel cluster scale`

```
USAGE
  $ sentinel cluster scale

DESCRIPTION
  This command scales your cluster up or down.

EXAMPLES
  $ sentinel cluster scale
```

_See code: [dist/commands/inventory.ts](https://github.com/Sentinel-PaaS/Sentinel-CLI/blob/main/sentinel/src/commands/cluster/scale.ts)_

## `sentinel scale app`

```
USAGE
  $ sentinel scale app

DESCRIPTION
  Scale an application up or down

EXAMPLES
  $ sentinel scale app

```

_See code: [dist/commands/inventory.ts](https://github.com/Sentinel-PaaS/Sentinel-CLI/blob/main/sentinel/src/commands/scale/app.ts)_

## `sentinel plugins`

List installed plugins.

```
USAGE
  $ sentinel plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ sentinel plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/index.ts)_

## `sentinel plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ sentinel plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ sentinel plugins add

EXAMPLES
  $ sentinel plugins:install myplugin 

  $ sentinel plugins:install https://github.com/someuser/someplugin

  $ sentinel plugins:install someuser/someplugin
```

## `sentinel plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ sentinel plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ sentinel plugins:inspect myplugin
```

## `sentinel plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ sentinel plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ sentinel plugins add

EXAMPLES
  $ sentinel plugins:install myplugin 

  $ sentinel plugins:install https://github.com/someuser/someplugin

  $ sentinel plugins:install someuser/someplugin
```

## `sentinel plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ sentinel plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLES
  $ sentinel plugins:link myplugin
```

## `sentinel plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ sentinel plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ sentinel plugins unlink
  $ sentinel plugins remove
```

## `sentinel plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ sentinel plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ sentinel plugins unlink
  $ sentinel plugins remove
```

## `sentinel plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ sentinel plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ sentinel plugins unlink
  $ sentinel plugins remove
```

## `sentinel plugins update`

Update installed plugins.

```
USAGE
  $ sentinel plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

## `sentinel remove app`

```
USAGE
  $ sentinel remove app

DESCRIPTION
  Removes an application from production.

EXAMPLES
  $ sentinel remove app
```

_See code: [dist/commands/remove.ts](https://github.com/sentinel/sentinel-paas/blob/v0.0.13/dist/commands/remove.ts)_
<!-- commandsstop -->
