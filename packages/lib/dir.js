import main from './inquirer/main.js'

export default function setDir(options, name) {
    switch (options.dir) {
        case 'overwrite':
            main(name)
            break
        case 'cancel':
            break
        default:
            break
    }
}
