import inquirer from 'inquirer'
import linters from '../../../data/linters.js'

export default function linter() {
    const questions = [
        {
            type: 'list',
            name: 'linter',
            message: 'Pick a linter/formatter config:',
            choices: linters.eslint,
            default: 0
        }
    ]

    return inquirer.prompt(questions)
}
