import fs from 'fs'
import path from 'path'
import shell from 'shelljs'
import { npm, npmTypes } from '../npm.js'
import ejf from 'edit-json-file'
import Listr from 'listr'

export default function next(name, settings) {
    return [
        {
            title: 'Checking TypeScript status',
            task: () => {
                if (settings.ts && settings.ts.use) {
                    shell.exec('npm i --quiet -D typescript')
                }
            }
        },
        {
            title: 'Checking state management features',
            task: () => {
                if (!settings.state) {
                    fs.rmSync('src/store', { recursive: true })
                } else {
                    shell.exec(npm[settings.state])
                    if (settings.ts && settings.ts.use)
                        shell.exec(npmTypes[settings.state])
                }
            }
        },
        {
            title: 'Readying selected frameworks',
            task: () => {
                if (settings.cssFrame) {
                    if (fs.existsSync(`--${settings.cssFrame}`)) {
                        fs.readdirSync(`--${settings.cssFrame}`).forEach(
                            (file) => {
                                fs.copyFileSync(
                                    `--${settings.cssFrame}/${file}`,
                                    file
                                )
                            }
                        )
                    }

                    if (fs.existsSync(`src/pages/--${settings.cssFrame}`)) {
                        fs.readdirSync(
                            `src/pages/--${settings.cssFrame}`
                        ).forEach((file) => {
                            fs.copyFileSync(
                                `src/pages/--${settings.cssFrame}/${file}`,
                                `src/pages/${file}`
                            )
                        })
                    }

                    fs.readdirSync('src/pages').forEach((file) => {
                        if (file.slice(0, 2) === '--')
                            fs.rmSync(`src/pages/${file}`, { recursive: true })
                    })

                    shell.exec(npm[settings.cssFrame])
                }
            }
        },
        {
            title: 'Preparing preprocessors',
            task: () => {
                if (settings.cssProc) {
                    if (fs.existsSync(`src/styles/--${settings.cssProc}`)) {
                        fs.readdirSync('src/styles').forEach((file) => {
                            if (
                                file.split('.')[file.split('.').length - 1] ===
                                'css'
                            )
                                fs.rmSync(`src/styles/${file}`, {
                                    recursive: true
                                })
                        })

                        fs.readdirSync(
                            `src/styles/--${settings.cssProc}`
                        ).forEach((file) => {
                            fs.copyFileSync(
                                `src/styles/--${settings.cssProc}/${file}`,
                                `src/styles/${file}`
                            )
                        })

                        shell.exec(npm[settings.cssProc])
                    }
                }
            }
        },
        {
            title: 'Setting up linters',
            task: () => {
                if (!settings.unit) {
                    fs.rmSync('src/tests', { recursive: true })
                }

                if (settings.linter) {
                    fs.copyFileSync(
                        `--eslint/${settings.linter.toLowerCase()}.json`,
                        `${settings.linter.toLowerCase()}.json`
                    )
                    fs.renameSync(`${settings.linter}.json`, '.eslintrc.json')
                    shell.exec(npm[settings.linter])
                }
            }
        },
        {
            title: 'Cleaning up',
            task: () => {
                fs.readdirSync('src/styles').forEach((file) => {
                    if (file.slice(0, 2) === '--')
                        fs.rmSync(`src/styles/${file}`, { recursive: true })
                })

                fs.readdirSync('src/pages').forEach((file) => {
                    if (file.slice(0, 2) === '--')
                        fs.rmSync(`src/pages/${file}`, { recursive: true })
                })

                fs.readdirSync('./').forEach((file) => {
                    if (file.slice(0, 2) === '--')
                        fs.rmSync(file, { recursive: true })
                })
            }
        },
        {
            title: 'Updating package.json',
            task: () => {
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
            }
        }
    ]
}
