import inquirer from 'inquirer'
import states from '../../../data/states.js'

export default function state() {
    const questions = [
        {
            type: 'list',
            name: 'state',
            message: 'Pick a state-management library:',
            choices: states.next,
            default: 0
        }
    ]

    return inquirer.prompt(questions)
}
