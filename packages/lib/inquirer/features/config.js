import inquirer from 'inquirer'

export default function config() {
    const questions = [
        {
            type: 'list',
            name: 'config',
            message:
                'Where do you prefer placing config for Babel, ESLint, etc.?',
            choices: [
                { name: 'In dedicated config files', value: 'files' },
                { name: 'In package.json', value: 'package' }
            ],
            default: 0
        }
    ]
    return inquirer.prompt(questions)
}
