import fs from 'fs'
import path from 'path'

export default function next(name, settings) {
    console.log(settings)
    if (!settings.state) {
        fs.rmSync('src/store', { recursive: true })
    }

    if (settings.cssFrame) {
        if (fs.existsSync(`--${settings.cssFrame}`)) {
            fs.readdirSync(`--${settings.cssFrame}`).forEach((file) => {
                fs.copyFileSync(`--${settings.cssFrame}/${file}`, '/')
            })
        }

        if (fs.existsSync(`src/styles/--${settings.cssFrame}`)) {
            fs.rmSync('src/styles/*.module.css')

            fs.readdirSync(`src/styles/--${settings.cssFrame}`).forEach(
                (file) => {
                    fs.copyFileSync(
                        `src/styles/--${settings.cssFrame}/${file}`,
                        'src/styles'
                    )
                }
            )

            fs.rmSync(`src/styles/--*`, { recursive: true })
        }

        if (fs.existsSync(`src/pages/--${settings.cssFrame}`)) {
            fs.readdirSync(`src/pages/--${settings.cssFrame}`).forEach(
                (file) => {
                    fs.copyFileSync(
                        `src/pages/--${settings.cssFrame}/${file}`,
                        'src/pages'
                    )
                }
            )

            fs.rmSync(`src/pages/--*`, { recursive: true })
        }
    }

    if (settings.cssProc) {
        fs.readdirSync('src/styles').forEach((file) => {
            if (file.split('.')[1] !== settings.cssProc)
                fs.rmSync(`src/styles/${file}`)
        })
    }

    if (!settings.unit) {
        fs.rmSync('src/tests', { recursive: true })
    }

    if (settings.linter) {
        fs.copyFileSync(`--eslint/${settings.linter}.json`, '/')
        fs.renameSync(`${settings.linter}.json`, '.eslintrc.json')
    }

    fs.rmSync(`src/pages/--*`, { recursive: true })
    fs.rmSync(`src/styles/--*`, { recursive: true })
    fs.rmSync(`--*`, { recursive: true })
}
