import main from './inquirer/main.js'
import babel from './inquirer/features/babel.js'
import state from './inquirer/features/state.js'
import cssProc from './inquirer/features/cssProc.js'
import cssFrame from './inquirer/features/cssFrame.js'
import linter from './inquirer/features/linter.js'
import unit from './inquirer/features/unit.js'
import config from './inquirer/features/config.js'
import version from './inquirer/features/version.js'
import inquirer from 'inquirer'

export default async function getSettings(name, options) {
    let settings = {}

    if (options.typescript) {
        settings = { ts: { use: true } }
    } else {
        const questions = [
            {
                type: 'list',
                name: 'preset',
                message: 'Please pick a preset:',
                choices: [
                    {
                        name: 'Some preset',
                        value: 'preset name'
                    },
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

            settings = { ...settings, config: (await config()).config }

            const questions = [
                {
                    type: 'confirm',
                    name: 'preset',
                    message: 'Save this as a preset for future projects?',
                    default: false
                }
            ]
            settings = {
                ...settings,
                preset: (await inquirer.prompt(questions)).preset
            }
        }
        // Get preset settings
        else settings = { preset }
    }

    return settings
}
