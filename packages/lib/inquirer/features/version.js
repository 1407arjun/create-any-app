import inquirer from 'inquirer'

export default function version() {
    const questions = [
        {
            type: 'list',
            name: 'version',
            message:
                'Choose a version of Next.js that you want to start the project with:',
            choices: [
                { name: '12.x', value: '12' },
                { name: '11.x', value: '11' }
            ],
            default: 0
        }
    ]

    return inquirer.prompt(questions)
}
