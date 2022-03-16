import config from './conf.js'
import fs from 'fs-extra'
import path from 'path'
import dir from './inquirer/dir.js'
import main from './fs/main.js'
import chalk from 'chalk'

export default async function create(preset, name, options) {
    console.log('create-any-app v0.1.0')

    let settings = {}
    let flag = 0
    for (const c of config.get('presets')) {
        if (c.name.toLowerCase() === preset.toLowerCase()) {
            settings = c
            flag = 1
            break
        }
    }

    if (flag === 1) {
        if (fs.existsSync(name)) {
            const res = await dir(name)
            if (res.dir === 'overwrite') {
                console.log(
                    '\n',
                    chalk.blue(
                        `Removing directory ${path.join(
                            process.cwd(),
                            name
                        )} ...`
                    )
                )

                fs.removeSync(name)
                console.log('\n')
            } else process.exit(0)
        }

        if (!options.git) settings = { ...settings, git: false }
        else settings = { ...settings, git: true }
    } else {
        console.log(`No preset found with the name ${preset}`)
        process.exit(0)
    }

    main(name, settings)
}
