import fs from 'fs'
import inquirer from 'inquirer'
import dir from './inquirer/dir.js'
import main from './inquirer/main.js'
import getSettings from './settings.js'

export default async function cli(name) {
    console.log('create-any-app v0.1.0')

    let settings = {}
    if (fs.existsSync(name)) {
        const res = await dir(name)
        if (res.dir === 'overwrite') settings = await getSettings(name)
        else process.exit(0)
    } else settings = await getSettings(name)

    console.log(settings)
}
