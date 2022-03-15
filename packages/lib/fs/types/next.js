import fs from 'fs'
import path from 'path'
import shell from 'shelljs'
import { npm, npmTypes } from '../npm.js'
import ejf from 'edit-json-file'
import chalk from 'chalk'
import clui from 'clui'

export default function next(name, settings) {
    const dep = ['npm i']
    const devDep = ['npm i -D']
    const Spinner = clui.Spinner

    var spinner = new Spinner('Adding scripts...', [
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

    let packageFile = ejf(path.join(process.cwd(), 'package.json'))
    packageFile.set(
        'description',
        'This is a Next.js project bootstrapped with create-any-app.'
    )
    packageFile.set('scripts.build', 'next build')
    packageFile.set('scripts.dev', 'next dev')
    packageFile.set('scripts.lint', 'next lint')
    packageFile.set('scripts.start', 'next start')
    packageFile.save()

    spinner.stop()
    console.log('\n', chalk.greenBright('✔️ Added scripts'))

    if (settings.ts && settings.ts.use) {
        var spinner = new Spinner('Configuring TypeScript...', [
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
        devDep.push('typescript')
        spinner.stop()
        console.log('\n', chalk.greenBright('✔️ Configured TypeScript'))
    }

    if (!settings.state) {
        fs.rmSync('src/store', { recursive: true })
    } else {
        var spinner = new Spinner('Setting up store...', [
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
        dep.push(npm[settings.state].join(' '))
        if (settings.ts && settings.ts.use)
            devDep.push(npmTypes[settings.state].join(' '))
        spinner.stop()
        console.log('\n', chalk.greenBright('✔️ Setup store'))
    }

    if (settings.cssFrame) {
        var spinner = new Spinner('Configuring frameworks...', [
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
        if (fs.existsSync(`--${settings.cssFrame}`)) {
            fs.readdirSync(`--${settings.cssFrame}`).forEach((file) => {
                fs.copyFileSync(`--${settings.cssFrame}/${file}`, file)
            })
        }

        if (fs.existsSync(`src/pages/--${settings.cssFrame}`)) {
            fs.readdirSync(`src/pages/--${settings.cssFrame}`).forEach(
                (file) => {
                    fs.copyFileSync(
                        `src/pages/--${settings.cssFrame}/${file}`,
                        `src/pages/${file}`
                    )
                }
            )
        }

        fs.readdirSync('src/pages').forEach((file) => {
            if (file.slice(0, 2) === '--')
                fs.rmSync(`src/pages/${file}`, { recursive: true })
        })

        dep.push(npm[settings.cssFrame].join(' '))
        spinner.stop()
        console.log('\n', chalk.greenBright('✔️ Configured frameworks'))
    }

    if (settings.cssProc) {
        if (fs.existsSync(`src/styles/--${settings.cssProc}`)) {
            var spinner = new Spinner('Configuring preprocessors...', [
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
            fs.readdirSync('src/styles').forEach((file) => {
                if (file.split('.')[file.split('.').length - 1] === 'css')
                    fs.rmSync(`src/styles/${file}`, {
                        recursive: true
                    })
            })

            fs.readdirSync(`src/styles/--${settings.cssProc}`).forEach(
                (file) => {
                    fs.copyFileSync(
                        `src/styles/--${settings.cssProc}/${file}`,
                        `src/styles/${file}`
                    )
                }
            )

            devDep.push(npm[settings.cssProc].join(' '))
            spinner.stop()
            console.log('\n', chalk.greenBright('✔️ Configured preprocessors'))
        }
    }

    if (!settings.unit) {
        fs.rmSync('src/tests', { recursive: true })
    } else {
        var spinner = new Spinner('Setting up unit tests...', [
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
        spinner.stop()
        console.log('\n', chalk.greenBright('✔️ Setup unit testing'))
    }

    if (settings.linter) {
        var spinner = new Spinner('Configuring linters...', [
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
        fs.copyFileSync(
            `--eslint/${settings.linter.toLowerCase()}.json`,
            `${settings.linter.toLowerCase()}.json`
        )
        fs.renameSync(`${settings.linter}.json`, '.eslintrc.json')
        devDep.push(npm[settings.linter].join(' '))
        spinner.stop()
        console.log('\n', chalk.greenBright('✔️ Configured linters'))
    }

    var spinner = new Spinner('Cleaning up files...', [
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

    fs.readdirSync('src/styles').forEach((file) => {
        if (file.slice(0, 2) === '--')
            fs.rmSync(`src/styles/${file}`, { recursive: true })
    })

    fs.readdirSync('src/pages').forEach((file) => {
        if (file.slice(0, 2) === '--')
            fs.rmSync(`src/pages/${file}`, { recursive: true })
    })

    fs.readdirSync('./').forEach((file) => {
        if (file.slice(0, 2) === '--') fs.rmSync(file, { recursive: true })
    })

    spinner.stop()
    console.log('\n', chalk.greenBright('✔️ Cleaned up files'))

    var spinner = new Spinner('Installing packages...', [
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

    shell.exec(dep.join(' '))
    shell.exec(devDep.join(' '))

    spinner.stop()
    console.log('\n', chalk.greenBright('✔️ Installed packages'))
}
