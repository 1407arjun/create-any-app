import inquirer from 'inquirer'
import versions from '../../../data/versions.js'

export default function version() {
    const questions = [
        {
            type: 'list',
            name: 'version',
            message:
                'Choose a version of Next.js that you want to start the project with:',
            choices: versions.next,
            default: 0
        }
    ]

    return inquirer.prompt(questions)
}
