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
            if (p.babel) s.push('Babel')
            if (p.ts) s.push('TypeScript')
            if (p.router) s.push('Router')
            if (p.state) s.push(terms[p.state])
            if (p.cssProc) s.push(terms[p.cssProc])
            if (p.cssFrame) s.push(terms[p.cssFrame])
            if (p.linter) s.push(terms[p.linter])
            if (p.unit) s.push(terms[p.unit])

            console.log(p.name + chalk.yellow(' [' + s.join(', ') + ']'))
        })
    }
}
