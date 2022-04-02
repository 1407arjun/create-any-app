import inquirer from 'inquirer'
import terms from '../../../data/terms.js'

export default function linter() {
    const questions = [
        {
            type: 'list',
            name: 'linter',
            message: 'Pick a linter/formatter config:',
            choices: terms.linter,
            default: 0
        }
    ]

    return inquirer.prompt(questions)
}
