import next from './types/next.js'
import clear from 'clear'
import shell from 'shelljs'

export default function main(name, settings) {
    clear()
    shell.mkdir(name)

    switch (settings.type) {
        case 'next':
            next(name, settings)
            break
        default:
            break
    }
}
