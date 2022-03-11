import next from './types/next.js'
import clear from 'clear'

export default function main(name, settings) {
    clear()
    switch (settings.type) {
        case 'next':
            next(name, settings)
            break
        default:
            break
    }
}
