import inquirer from 'inquirer'

export default function cssProc() {
    const questions = [
        {
            type: 'list',
            name: 'preProcessor',
            message: 'Pick a CSS pre-processor:',
            choices: [
                { name: 'PostCSS', value: 'postcss' },
                { name: 'Sass/SCSS', value: 'sass' },
                { name: 'Less', value: 'less' },
                { name: 'Stylus', value: 'stylus' }
            ],
            default: 0
        }
    ]

    return inquirer.prompt(questions)
}
