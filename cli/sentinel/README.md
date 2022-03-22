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
$ npm install -g sentinel-paas
$ sentinel COMMAND
running command...
$ sentinel (--version)
sentinel-paas/0.0.0 linux-x64 node-v14.18.0
$ sentinel --help [COMMAND]
USAGE
  $ sentinel COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`sentinel hello PERSON`](#sentinel-hello-person)
* [`sentinel hello world`](#sentinel-hello-world)
* [`sentinel help [COMMAND]`](#sentinel-help-command)
* [`sentinel plugins`](#sentinel-plugins)
* [`sentinel plugins:install PLUGIN...`](#sentinel-pluginsinstall-plugin)
* [`sentinel plugins:inspect PLUGIN...`](#sentinel-pluginsinspect-plugin)
* [`sentinel plugins:install PLUGIN...`](#sentinel-pluginsinstall-plugin-1)
* [`sentinel plugins:link PLUGIN`](#sentinel-pluginslink-plugin)
* [`sentinel plugins:uninstall PLUGIN...`](#sentinel-pluginsuninstall-plugin)
* [`sentinel plugins:uninstall PLUGIN...`](#sentinel-pluginsuninstall-plugin-1)
* [`sentinel plugins:uninstall PLUGIN...`](#sentinel-pluginsuninstall-plugin-2)
* [`sentinel plugins update`](#sentinel-plugins-update)

## `sentinel hello PERSON`

Say hello

```
USAGE
  $ sentinel hello [PERSON] -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Whom is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/sentinel/sentinel-paas/blob/v0.0.0/dist/commands/hello/index.ts)_

## `sentinel hello world`

Say hello world

```
USAGE
  $ sentinel hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ oex hello world
  hello world! (./src/commands/hello/world.ts)
```

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
<!-- commandsstop -->
