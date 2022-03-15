import fs from 'fs'
import path from 'path'
import dir from './inquirer/dir.js'
import getSettings from './settings.js'
import main from './fs/main.js'
import clui from 'clui'

export default async function cli(name, options, type) {
    console.log('create-any-app v0.1.0')

    let settings = {}

    if (fs.existsSync(name)) {
        const res = await dir(name)
        if (res.dir === 'overwrite') {
            const spinner = new clui.Spinner(
                `Removing directory ${path.join(process.cwd(), name)} ...`,
                ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷']
            )
            spinner.start()
            fs.rmSync(name, { recursive: true })
            spinner.stop()
            console.log('\n')
            settings = await getSettings(options, type)
        } else process.exit(0)
    } else settings = await getSettings(options, type)

    main(name, settings)
}
