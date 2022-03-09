import inquirer from 'inquirer'

export default function cssFrame() {
    const questions = [
        {
            type: 'list',
            name: 'framework',
            message: 'Pick a CSS framework:',
            choices: [
                { name: 'TailwindCSS', value: 'tw' },
                { name: 'Bootstrap', value: 'bs' },
                { name: 'Chakra UI', value: 'ckui' },
                { name: 'Material UI', value: 'mui' },
                { name: 'Ant Design', value: 'ant' },
                { name: 'None', value: 'none' }
            ],
            default: 0
        }
    ]
    return inquirer.prompt(questions)
}
