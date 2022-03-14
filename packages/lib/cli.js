import fs from 'fs'
import path from 'path'
import clear from 'clear'
import dir from './inquirer/dir.js'
import getSettings from './settings.js'
import main from './fs/main.js'
import shell from 'shelljs'

export default async function cli(name, options, type) {
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
            settings = await getSettings(options, type)
        } else process.exit(0)
    } else settings = await getSettings(options, type)

    main(name, settings)
}
