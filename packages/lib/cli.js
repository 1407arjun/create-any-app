import fs from 'fs'
import dir from './inquirer/dir.js'
import setDir from './dir.js'
import main from './inquirer/main.js'

export default async function cli(name) {
    if (fs.existsSync(name)) setDir(await dir(name), name)
    else await setMain(main(name))
}
