import fs from 'fs'
import path from 'path'
import clear from 'clear'
import dir from './inquirer/dir.js'
import getSettings from './settings.js'

export default async function next(name, options) {
    console.log('create-any-app v0.1.0')

    let settings = {}

    if (fs.existsSync(name)) {
        const res = await dir(name)
        if (res.dir === 'overwrite') {
            console.log(
                `Removing directory ${path.join(process.cwd(), name)} ...`
            )
            fs.rmSync(name, { recursive: true })
            clear()
            settings = await getSettings(name, options)
        } else process.exit(0)
    } else settings = await getSettings(name, options)

    if (settings.name) {
    }

    console.log(settings)
}
