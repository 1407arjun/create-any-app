#!/usr/bin/env node

import { program } from 'commander'
import cli from '../lib/cli.js'

program
    .name('create-any-app')
    .description(
        'CLI for rapid creation, configuration and development of JavaScript apps.'
    )
    .version('0.1.0', '-v, ,--vers, --version', 'print create-any-app version')

program
    .command('next')
    .description('Create a new Next.js project')
    .argument('<project-name>', 'name of the project')
    .option('-ts, --typescript', 'Creates a new Next.js project in TypeScript')
    .option(
        '--no-git',
        'Creates a new project without initializing a Git repository'
    )
    .action(cli)

program.parse()
