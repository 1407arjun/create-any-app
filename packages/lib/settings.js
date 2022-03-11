import main from './inquirer/main.js'
import babel from './inquirer/features/babel.js'
import state from './inquirer/features/state.js'
import cssProc from './inquirer/features/cssProc.js'
import cssFrame from './inquirer/features/cssFrame.js'
import linter from './inquirer/features/linter.js'
import unit from './inquirer/features/unit.js'
import configFiles from './inquirer/features/configFiles.js'
import version from './inquirer/features/version.js'
import terms from '../data/terms.js'
import inquirer from 'inquirer'
import config from './conf.js'

export default async function getSettings(name, options, type) {
    let settings = {}
    settings = { ...settings, type }

    if (options.typescript) {
        settings = { ...settings, ts: { use: true } }
    } else {
        const questions = [
            {
                type: 'list',
                name: 'preset',
                message: 'Please pick a preset:',
                choices: [
                    ...config.get('presets').map((c) => {
                        const s = []
                        if (c.babel) s.push('Babel')
                        if (c.ts) s.push('TypeScript')
                        if (c.router) s.push('Router')
                        if (c.state) s.push(terms[c.state])
                        if (c.cssProc) s.push(terms[c.cssProc])
                        if (c.cssFrame) s.push(terms[c.cssFrame])
                        if (c.linter) s.push(terms[c.linter])
                        if (c.unit) s.push(terms[c.unit])

                        return c.name + ' [' + s.join(', ') + ']'
                    }),
                    {
                        name: 'Manually select features',
                        value: 'manual'
                    }
                ],
                default: 0
            }
        ]

        const preset = (await inquirer.prompt(questions)).preset

        if (preset === 'manual') {
            settings = {
                ...settings,
                version: Number((await version()).version)
            }
            const options = await main(name)
            for (const opt of options.features) {
                switch (opt) {
                    case 'babel':
                        settings = { ...settings, babel: true }
                        break
                    case 'ts':
                        settings = {
                            ...settings,
                            ts: {
                                use: true,
                                babel: (await babel()).babel
                            }
                        }
                        break
                    case 'router':
                        settings = { ...settings, router: true }
                        break
                    case 'state':
                        settings = { ...settings, state: (await state()).state }
                        break
                    case 'cssProc':
                        settings = {
                            ...settings,
                            cssProc: (await cssProc()).preProcessor
                        }
                        break
                    case 'cssFrame':
                        settings = {
                            ...settings,
                            cssFrame: (await cssFrame()).framework
                        }
                        break
                    case 'linter':
                        settings = {
                            ...settings,
                            linter: (await linter()).linter
                        }
                        break
                    case 'unit':
                        settings = { ...settings, unit: (await unit()).unit }
                        break
                    default:
                        break
                }
            }

            settings = {
                ...settings,
                config: (await configFiles()).configFiles
            }

            const questions = [
                {
                    type: 'confirm',
                    name: 'preset',
                    message: 'Save this as a preset for future projects?',
                    default: false
                }
            ]

            const res = (await inquirer.prompt(questions)).preset

            if (res) {
                const presetName = (
                    await inquirer.prompt([
                        {
                            type: 'input',
                            name: 'name',
                            message: 'Save preset as:'
                        }
                    ])
                ).name.trim()

                if (presetName !== '') {
                    settings = { ...settings, name: presetName }

                    let flag = 0
                    for (const c of config.get('presets')) {
                        if (
                            c.name.toLowerCase() === settings.name.toLowerCase()
                        ) {
                            flag = 1
                            break
                        }
                    }
                    if (flag === 1) {
                        const r = (
                            await inquirer.prompt([
                                {
                                    type: 'list',
                                    name: 'preset',
                                    message: `Preset ${settings.name} already exists. Pick an option:`,
                                    choices: [
                                        {
                                            name: 'Overwrite',
                                            value: 'overwrite'
                                        },
                                        { name: 'Cancel', value: 'cancel' }
                                    ],
                                    default: 0
                                }
                            ])
                        ).preset

                        if (r === 'overwrite') {
                            const preset = config.get('presets')
                            for (var i = 0; i < preset.length; i++) {
                                if (
                                    preset[i].name.toLowerCase() ===
                                    settings.name.toLowerCase()
                                ) {
                                    preset[i] = settings
                                    break
                                }
                            }
                            config.set('presets', preset)
                        }
                    } else
                        config.set('presets', [
                            ...config.get('presets'),
                            settings
                        ])
                }
            }
        } else {
            for (const c of config.get('presets')) {
                if (
                    c.name.toLowerCase() ===
                    preset.toLowerCase().split(' ')[0].trim()
                ) {
                    settings = c
                    break
                }
            }
        }
    }

    if (!options.git) settings = { ...settings, git: false }
    else settings = { ...settings, git: true }

    return settings
}
