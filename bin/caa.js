#!/usr/bin/env node

// import clear from 'clear'
// import chalk from 'chalk'
// import figlet from 'figlet'
import { program } from 'commander'

// clear()

// console.log(
//     chalk.yellow(
//         figlet.textSync('create-any-app', { horizontalLayout: 'full' })
//     )
// )

program
    .name('create-any-app')
    .description(
        'CLI for rapid creation, configuration and development of JavaScript apps.'
    )
    .version('0.1.0', '-v, ,--vers, --version', 'print create-any-app version')

program
    .command('next <project-name>')
    .description('Create a new Next.js project')
    .action((name) => {
        console.log(name)
    })

program.parse()
