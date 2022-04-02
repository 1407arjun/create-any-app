import chalk from 'chalk'
import config from './conf.js'
import terms from '../data/terms.js'

export default function preset(options) {
    const presets = config.get('presets')

    if (options.Remove) {
        let flag = 0
        presets.forEach((p) => {
            if (p.name.toLowerCase() === options.Remove.toLowerCase()) {
                flag = 1
            }
        })

        if (flag === 1) {
            const newPresets = presets.filter((p) => {
                return p.name.toLowerCase() !== options.Remove.toLowerCase()
            })

            config.set('presets', newPresets)
            console.log(chalk.red(`Removed preset ${options.Remove}`))
        } else console.log(chalk.red(`Preset ${options.Remove} not found`))
    } else {
        if (presets.length > 0)
            console.log(chalk.blueBright('Found the following presets:'))
        else console.log(chalk.blueBright('No presets found'))
        presets.forEach((p) => {
            const s = []
            if (p.type) {
                if (
                    types.frontend.types.find((t) => {
                        return t.value === p.type
                    })
                )
                    s.push(
                        types.frontend.types.find((t) => {
                            return t.value === p.type
                        }).name
                    )
                else
                    s.push(
                        types.backend.types.find((t) => {
                            return t.value === p.type
                        }).name
                    )
            }

            for (const f of types.frontend.types.find((t) => {
                return t.value === type
            })
                ? types.frontend.features
                : types.backend.features) {
                if (
                    f.value === 'babel' ||
                    f.value === 'ts' ||
                    f.value === 'router'
                ) {
                    if (p[f.value]) s.push(f.name)
                } else if (f.value === 'state') {
                    if (p[f.value])
                        s.push(
                            terms[f.value][type].find((t) => {
                                return t.value === p[f.value]
                            }).name
                        )
                } else {
                    if (p[f.value])
                        s.push(
                            terms[f.value].find((t) => {
                                return t.value === p[f.value]
                            }).name
                        )
                }
            }

            console.log(p.name + chalk.yellow(' [' + s.join(', ') + ']'))
        })
    }
}
