import clear from 'clear'
import fs from 'fs'
import shell from 'shelljs'
import next from './types/next.js'
import download from './download.js'
import chalk from 'chalk'

export default async function main(name, settings) {
    console.log('\ncreate-any-app v0.1.0')
    var silentState = shell.config.silent

    fs.mkdirSync(name)
    console.log('\n', chalk.greenBright('✔️ Created project folder'))

    // Download template
    download(
        settings.type,
        name,
        settings.ts && settings.ts.use ? settings.ts.use : false
    )
    console.log('\n', chalk.greenBright('✔️ Fetched template files'))

    process.chdir(name)

    // Initialize npm
    shell.config.silent = true
    shell.exec('npm init -y')
    shell.config.silent = silentState
    console.log('\n', chalk.greenBright('✔️ Initialized npm'))

    // Perform removal as per settings
    switch (settings.type) {
        case 'next':
            next(name, settings)
        default:
            break
    }

    // Run audit
    shell.exec('npm audit fix')
    console.log('\n', chalk.greenBright('✔️ Audited packages'))

    // Setup Git repository
    if (settings.git) {
        shell.config.silent = true
        shell.exec('git init')
        shell.exec('git add .')
        shell.exec('git commit -q -m "Initial commit"')
        shell.config.silent = silentState
        console.log('\n', chalk.greenBright('✔️ Initialized Git repository'))
    } else fs.rmSync('.gitignore')

    console.log(
        '\n',
        'Run your new app using the following commands:\n',
        chalk.blueBright(`cd ${name}`),
        '\n',
        chalk.blueBright('npm run dev')
    )
}
