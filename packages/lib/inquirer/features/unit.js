import inquirer from 'inquirer'
import units from '../../../data/features/units.js'

export default function unit() {
    const questions = [
        {
            type: 'list',
            name: 'unit',
            message: 'Pick unit testing solution:',
            choices: units.unit,
            default: 0
        }
    ]
    return inquirer.prompt(questions)
}
