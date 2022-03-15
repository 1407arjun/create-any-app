import clear from 'clear'
import fs from 'fs'
import shell from 'shelljs'
import next from './types/next.js'
import download from './download.js'
import Listr from 'listr'
import chalk from 'chalk'

export default async function main(name, settings) {
    clear()
    console.log('\n\n')
    const ops = () => {
        switch (settings.type) {
            case 'next':
                return next(name, settings)
            default:
                break
        }
    }

    const tasks = new Listr([
        {
            title: 'Making a new directory',
            task: () => {
                fs.mkdirSync(name)
            }
        },
        {
            title: 'Fetching templates',
            task: () => {
                // Download template
                download(
                    settings.type,
                    name,
                    settings.ts && settings.ts.use ? settings.ts.use : false
                )
            }
        },
        {
            title: 'Initialize npm',
            task: () => {
                process.chdir(name)

                // Initialize npm
                shell.exec('npm init -y')
            }
        },
        // Perform removal as per settings
        ...ops(),
        {
            title: 'Running audit',
            task: () => {
                // Run audit
                shell.exec('npm audit fix')
            }
        },
        {
            title: 'Checking Version Control Settings',
            task: () => {
                // Setup Git repository
                if (settings.git) {
                    shell.exec('git init')
                    shell.exec('git add .')
                    shell.exec('git commit -q -m "Initial commit"')
                } else fs.rmSync('.gitignore')
            }
        }
    ])

    await tasks.run()

    shell.cd(name)
    console.log(
        '\n\n',
        'Run your new app using',
        chalk.blueBright('npm run dev')
    )
}
