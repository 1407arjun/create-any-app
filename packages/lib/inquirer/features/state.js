import inquirer from 'inquirer'
import terms from '../../../data/terms.js'

export default function state(type) {
    const questions = [
        {
            type: 'list',
            name: 'state',
            message: 'Pick a state-management library:',
            choices: terms.states[type],
            default: 0
        }
    ]

    return inquirer.prompt(questions)
}
