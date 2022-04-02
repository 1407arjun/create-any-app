import inquirer from 'inquirer'
import terms from '../../../data/terms.js'

export default function cssProc() {
    const questions = [
        {
            type: 'list',
            name: 'preProcessor',
            message: 'Pick a CSS pre-processor:',
            choices: terms.cssProcs,
            default: 0
        }
    ]

    return inquirer.prompt(questions)
}
