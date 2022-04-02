import inquirer from 'inquirer'
import terms from '../../../data/terms.js'

export default function cssFrame() {
    const questions = [
        {
            type: 'list',
            name: 'framework',
            message: 'Pick a CSS framework:',
            choices: terms.cssFrame,
            default: 0
        }
    ]
    return inquirer.prompt(questions)
}
