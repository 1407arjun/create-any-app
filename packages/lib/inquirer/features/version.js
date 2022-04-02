import inquirer from 'inquirer'
import terms from '../../../data/terms.js'

export default function version(type) {
    const questions = [
        {
            type: 'list',
            name: 'version',
            message:
                'Choose a version of Next.js that you want to start the project with:',
            choices: terms.version[type],
            default: 0
        }
    ]

    return inquirer.prompt(questions)
}
