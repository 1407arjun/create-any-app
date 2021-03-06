import fs from 'fs-extra'
import path from 'path'
import dir from './inquirer/dir.js'
import getSettings from './settings.js'
import main from './fs/main.js'
import chalk from 'chalk'

export default async function cli(name, options, type) {
    let settings = {}

    if (fs.existsSync(name)) {
        const res = await dir(name)
        if (res.dir === 'overwrite') {
            console.log(
                '\n',
                chalk.blue(
                    `Removing directory ${path.join(process.cwd(), name)} ...`
                )
            )

            fs.removeSync(name)
            console.log('\n')
            settings = await getSettings(options, type)
        } else process.exit(0)
    } else settings = await getSettings(options, type)

    main(name, settings)
}
