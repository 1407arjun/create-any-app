import clear from 'clear'
import fs from 'fs'
import shell from 'shelljs'
import next from './types/next.js'
import download from './download.js'
import chalk from 'chalk'
import clui from 'clui'

export default async function main(name, settings) {
    console.log('\ncreate-any-app v0.1.0')
    const Spinner = clui.Spinner
    var silentState = shell.config.silent

    fs.mkdirSync(name)
    var spinner = new Spinner('Fetching template files...')
    spinner.start()

    // Download template
    download(
        settings.type,
        name,
        settings.ts && settings.ts.use ? settings.ts.use : false
    )
    spinner.stop()
    console.log('\n', chalk.greenBright('✔️ Fetched template files'))

    process.chdir(name)

    // Initialize npm
    var spinner = new Spinner('Initializing npm...', [
        '⣾',
        '⣽',
        '⣻',
        '⢿',
        '⡿',
        '⣟',
        '⣯',
        '⣷'
    ])
    spinner.start()
    shell.config.silent = true
    shell.exec('npm init -y')
    shell.config.silent = silentState
    spinner.stop()
    console.log('\n', chalk.greenBright('✔️ Initialized npm'))

    // Perform removal as per settings
    switch (settings.type) {
        case 'next':
            next(name, settings)
        default:
            break
    }

    // Run audit
    var spinner = new Spinner('Running audit...', [
        '⣾',
        '⣽',
        '⣻',
        '⢿',
        '⡿',
        '⣟',
        '⣯',
        '⣷'
    ])
    spinner.start()
    shell.exec('npm audit fix')
    spinner.stop()
    console.log('\n', chalk.greenBright('✔️ Audited packages'))

    // Setup Git repository
    if (settings.git) {
        var spinner = new Spinner('Initializing a Git repository...', [
            '⣾',
            '⣽',
            '⣻',
            '⢿',
            '⡿',
            '⣟',
            '⣯',
            '⣷'
        ])
        spinner.start()
        shell.config.silent = true
        shell.exec('git init')
        shell.exec('git add .')
        shell.exec('git commit -q -m "Initial commit"')
        shell.config.silent = silentState
        spinner.stop()
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
