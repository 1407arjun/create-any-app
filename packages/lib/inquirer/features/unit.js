import inquirer from 'inquirer'
import terms from '../../../data/terms.js'

export default function unit() {
    const questions = [
        {
            type: 'list',
            name: 'unit',
            message: 'Pick unit testing solution:',
            choices: terms.unit,
            default: 0
        }
    ]
    return inquirer.prompt(questions)
}
