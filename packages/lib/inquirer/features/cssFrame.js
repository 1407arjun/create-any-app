import inquirer from 'inquirer'
import cssFrames from '../../../data/cssFrames.js'

export default function cssFrame() {
    const questions = [
        {
            type: 'list',
            name: 'framework',
            message: 'Pick a CSS framework:',
            choices: cssFrames.frameworks,
            default: 0
        }
    ]
    return inquirer.prompt(questions)
}
