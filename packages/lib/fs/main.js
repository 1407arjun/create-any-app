import clear from 'clear'
import shell from 'shelljs'
import next from './types/next.js'
import download from './download.js'

export default function main(name, settings) {
    clear()
    shell.mkdir(name)

    // Download template
    download(
        settings.type,
        name,
        settings.ts && settings.ts.use ? settings.ts.use : false
    )

    // Initialize npm
    shell.exec('npm init -y')

    // Perform removal as per settings
    switch (settings.type) {
        case 'next':
            next(name, settings)
            break
        default:
            break
    }

    // Setup Git repository
    if (settings.git) {
        shell.exec('git init')
        shell.exec('git add .')
        shell.exec('git commit -m "Initial commit"')
    } else shell.rm('.gitignore')
}
