import babel from './inquirer/features/babel.js'
import state from './inquirer/features/state.js'
import cssProc from './inquirer/features/cssProc.js'
import cssFrame from './inquirer/features/cssFrame.js'
import linter from './inquirer/features/linter.js'
import unit from './inquirer/features/unit.js'
import config from './inquirer/features/config.js'
import version from './inquirer/features/version.js'
import inquirer from 'inquirer'

export default async function getSettings(options) {
    const settings = {}

    settings.version = await version()
    options.features.forEach(async (opt) => {
        switch (opt) {
            case 'babel':
                settings.babel = true
                break
            case 'ts':
                settings.ts.use = true
                if (settings.babel) settings.ts.babel = await babel()
                break
            case 'router':
                settings.router = true
                break
            case 'state':
                settings.state = await state()
                break
            case 'cssProc':
                settings.cssProc = await cssProc()
                break
            case 'cssFrame':
                settings.cssFrame = await cssFrame()
                break
            case 'linter':
                settings.linter = await linter()
                break
            case 'unit':
                settings.unit = await unit()
                break
            default:
                break
        }
    })

    settings.config = await config()

    const questions = [
        {
            type: 'confirm',
            name: 'preset',
            message: 'Save this as a preset for future projects?',
            default: true
        }
    ]
    settings.save = await inquirer.prompt(questions)

    return settings
}
