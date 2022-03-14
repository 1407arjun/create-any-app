import fs from 'fs'

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
            fs.readdirSync(`src/styles/--${settings.cssFrame}`).forEach(
                (file) => {
                    fs.copyFileSync(
                        `src/styles/--${settings.cssFrame}/${file}`,
                        'src/styles'
                    )
                }
            )

            fs.readdirSync('src/styles').forEach((file) => {
                if (file.slice(0, 2) === '--')
                    fs.rmSync(`src/styles/${file}`, { recursive: true })
                if (file.split('.')[0] === 'Home')
                    fs.rmSync(`src/styles/${file}`)
            })
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

            fs.readdirSync('src/pages').forEach((file) => {
                if (file.slice(0, 2) === '--')
                    fs.rmSync(`src/pages/${file}`, { recursive: true })
            })
        }
    } else {
        fs.readdirSync('src/pages').forEach((file) => {
            if (file.slice(0, 2) === '--')
                fs.rmSync(`src/pages/${file}`, { recursive: true })
        })

        fs.readdirSync('src/styles').forEach((file) => {
            if (file.slice(0, 2) === '--')
                fs.rmSync(`src/styles/${file}`, { recursive: true })
        })
    }

    if (settings.cssProc) {
        fs.readdirSync('src/styles').forEach((file) => {
            if (file.split('.')[1] !== settings.cssProc)
                fs.rmSync(`src/styles/${file}`)
        })
    } else {
        fs.readdirSync('src/styles').forEach((file) => {
            fs.rmSync(`src/styles/${file}`)
        })
    }

    if (!settings.unit) {
        fs.rmSync('src/tests', { recursive: true })
    }

    if (settings.linter) {
        fs.copyFileSync(`--eslint/${settings.linter.toLowerCase()}.json`, '/')
        fs.renameSync(`${settings.linter}.json`, '.eslintrc.json')
    }

    fs.readdirSync('/').forEach((file) => {
        if (file.slice(0, 2) === '--') fs.rmSync(file, { recursive: true })
    })
}
