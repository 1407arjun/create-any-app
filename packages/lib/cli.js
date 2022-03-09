import fs from 'fs'
import dir from './inquirer/dir.js'
import main from './inquirer/main.js'
import getSettings from './settings.js'

export default async function cli(name) {
    let settings = {}
    if (fs.existsSync(name)) {
        const res = await dir(name)
        if (res.dir === 'overwrite') settings = await getSettings(main(name))
        else process.exit(0)
    } else settings = await getSettings(main(name))

    console.log(settings)
}
