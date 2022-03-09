import inquirer from 'inquirer'
import path from 'path'

export default function dir(name) {
    const questions = [
        {
            type: 'list',
            name: 'dir',
            message: `Target directory ${path.join(
                process.cwd(),
                name
            )} already exists. Pick an option:`,
            choices: [
                { name: 'Overwrite', value: 'overwrite' },
                { name: 'Cancel', value: 'cancel' }
            ],
            default: 0
        }
    ]

    return inquirer.prompt(questions)
}
