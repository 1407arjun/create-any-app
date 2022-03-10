import fs from 'fs'
import inquirer from 'inquirer'
import dir from './inquirer/dir.js'
import main from './inquirer/main.js'
import getSettings from './settings.js'

export default async function cli(name, options) {
    console.log('create-any-app v0.1.0')

    let settings = {}

    if (fs.existsSync(name)) {
        const res = await dir(name)
        if (res.dir === 'overwrite') settings = await getSettings(name, options)
        else process.exit(0)
    } else settings = await getSettings(name, options)

    if (!options.git) settings = { ...settings, git: false }
    else settings = { ...settings, git: true }

    console.log(settings)
}
