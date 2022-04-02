import inquirer from 'inquirer'
import clear from 'clear'
import types from '../../data/types.js'

export default function features(type) {
    clear()
    const questions = [
        {
            type: 'checkbox',
            name: 'features',
            message: 'Check the features needed for your project:',
            choices: types.frontend.types.find((t) => {
                return t.value === type
            })
                ? types.frontend.features
                : types.backend.features,
            loop: false
        }
    ]
    return inquirer.prompt(questions)
}
