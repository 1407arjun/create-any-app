import features from './inquirer/features.js'
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
import chalk from 'chalk'
import config from './conf.js'
import types from '../data/types.js'

export default async function getSettings(options, type) {
    let settings = {}
    settings = { ...settings, type }

    if (options.typescript) {
        settings = { ...settings, ts: { use: true } }
    } else {
        const presets = config.get('presets').filter((c) => {
            return c.type === type
        })

        const questions = [
            {
                type: 'list',
                name: 'preset',
                message: 'Please pick a preset:',
                choices: [
                    ...presets.map((c) => {
                        const s = []
                        if (c.type) {
                            if (
                                types.frontend.types.find((t) => {
                                    return t === c.type
                                })
                            )
                                s.push(
                                    types.frontend.types.find((t) => {
                                        return t === c.type
                                    }).name
                                )
                            else
                                s.push(
                                    types.backend.types.find((t) => {
                                        return t === c.type
                                    }).name
                                )
                        }

                        for (const f of types.frontend.types.find((t) => {
                            return t === type
                        })
                            ? types.frontend.features
                            : types.backend.features) {
                            if (
                                f.value === 'babel' ||
                                f.value === 'ts' ||
                                f.value === 'router'
                            ) {
                                if (c[f.value]) s.push(f.name)
                            } else if (f.value === 'state') {
                                if (c[f.value])
                                    s.push(
                                        terms[f.value][type].find((t) => {
                                            return t.value === c[f.value]
                                        }).name
                                    )
                            } else {
                                if (c[f.value])
                                    s.push(
                                        terms[f.value].find((t) => {
                                            return t.value === c[f.value]
                                        }).name
                                    )
                            }
                        }

                        return c.name + chalk.yellow(' [' + s.join(', ') + ']')
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
            /*settings = {
                ...settings,
                version: Number((await version(type)).version)
            }*/
            const options = await features(type)
            for (const opt of options.features) {
                switch (opt) {
                    case 'babel':
                        settings = { ...settings, babel: true }
                        break
                    case 'ts':
                        settings = {
                            ...settings,
                            ts: {
                                use: true
                                //babel: (await babel()).babel
                            }
                        }
                        break
                    case 'router':
                        settings = { ...settings, router: true }
                        break
                    case 'state':
                        settings = {
                            ...settings,
                            state: (await state(type)).state
                        }
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
