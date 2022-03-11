#!/usr/bin/env node

import { program } from 'commander'
import cli from '../lib/cli.js'
import preset from '../lib/preset.js'

program
    .name('create-any-app')
    .description(
        'A CLI for rapid creation, configuration and development of JavaScript apps.'
    )
    .version('0.1.0', '-v, ,--vers, --version', 'print create-any-app version')

program
    .command('preset')
    .description('Create a new project from a preset configuration')
    .argument('<preset-name>', 'name of the preset')
    .argument('<project-name>', 'name of the project')
    .option(
        '--no-git',
        'create a new project without initializing a git repository'
    )
    .action(preset)

program
    .command('next')
    .description('Create a new Next.js project')
    .argument('<project-name>', 'name of the project')
    .option('-ts, --typescript', 'create a new Next.js project in TypeScript')
    .option(
        '--no-git',
        'create a new project without initializing a Git repository'
    )
    .action((name, options) => {
        cli(name, options, 'next')
    })

program.parse()
