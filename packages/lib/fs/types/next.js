import fs from 'fs'
import path from 'path'
import shell from 'shelljs'
import { npm, npmTypes, scripts } from '../npm.js'
import ejf from 'edit-json-file'
import chalk from 'chalk'
import copy from '../utils/copy.js'
import remove from '../utils/remove.js'

export default function next(name, settings) {
    const dep = ['npm i next react react-dom']
    const devDep = ['npm i -D @types/node @types/react @types/react-dom']

    let packageFile = ejf(path.join(process.cwd(), 'package.json'))
    packageFile.set(
        'description',
        'This is a Next.js project bootstrapped with create-any-app.'
    )
    packageFile.set('scripts.build', scripts.next.build)
    packageFile.set('scripts.dev', scripts.next.dev)
    packageFile.set('scripts.lint', scripts.next.lint)
    packageFile.set('scripts.start', scripts.next.start)
    packageFile.save()

    console.log('\n', chalk.greenBright('✔️ Added scripts'))

    if (settings.ts && settings.ts.use) {
        devDep.push('typescript')
        console.log('\n', chalk.greenBright('✔️ Configured TypeScript'))
    }

    if (!settings.state) {
        fs.rmSync('src/store', { recursive: true })
    } else {
        copy(`src/store/--${settings.state}`, `src/store`)
        remove('src/store')

        dep.push(npm[settings.state].join(' '))
        if (settings.ts && settings.ts.use)
            devDep.push(npmTypes[settings.state].join(' '))
        console.log('\n', chalk.greenBright('✔️ Setup store'))
    }

    if (settings.cssFrame) {
        copy(`--${settings.cssFrame}`, `./`)
        copy(`src/pages/--${settings.cssFrame}`, `src/pages`)
        remove('src/pages')

        dep.push(npm[settings.cssFrame].join(' '))
        console.log('\n', chalk.greenBright('✔️ Configured frameworks'))
    }

    if (settings.cssProc) {
        if (fs.existsSync(`src/styles/--${settings.cssProc}`)) {
            fs.readdirSync('src/styles').forEach((file) => {
                if (file.split('.')[file.split('.').length - 1] === 'css')
                    fs.rmSync(`src/styles/${file}`, {
                        recursive: true
                    })
            })

            copy(`src/styles/--${settings.cssProc}`, `src/styles`)

            devDep.push(npm[settings.cssProc].join(' '))
            console.log('\n', chalk.greenBright('✔️ Configured preprocessors'))
        }
    }

    if (!settings.unit) {
        fs.rmSync('src/tests', { recursive: true })
    } else {
        copy(`--${settings.unit}`, `./`)
        copy(`src/tests/--${settings.unit}`, `src/tests`)
        remove('src/tests')

        dep.push(npm[settings.unit].join(' '))
        if (settings.ts && settings.ts.use)
            devDep.push(npmTypes[settings.unit].join(' '))

        packageFile.set('scripts.test', scripts.next.test[settings.unit])
        console.log('\n', chalk.greenBright('✔️ Setup unit testing'))
    }

    if (settings.linter) {
        fs.copyFileSync(
            `--eslint/${settings.linter.toLowerCase()}.json`,
            `${settings.linter.toLowerCase()}.json`
        )
        fs.renameSync(`${settings.linter}.json`, '.eslintrc.json')

        devDep.push(npm[settings.linter].join(' '))
        console.log('\n', chalk.greenBright('✔️ Configured linters'))
    }

    fs.readdirSync('src/styles').forEach((file) => {
        if (file.slice(0, 2) === '--')
            fs.rmSync(`src/styles/${file}`, { recursive: true })
    })

    remove('src/styles')
    remove('src/pages')
    remove('./')
    console.log('\n', chalk.greenBright('✔️ Cleaned up files'))

    shell.exec(dep.join(' '))
    shell.exec(devDep.join(' '))
    console.log('\n', chalk.greenBright('✔️ Installed packages'))
}
