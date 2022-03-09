import inquirer from 'inquirer'

export default function babel() {
    const questions = [
        {
            type: 'confirm',
            name: 'babel',
            message:
                'Use babel alongside TypeScript (required for modern mode, auto-detected polyfills, transpiling JSX)?',
            default: true
        }
    ]
    return inquirer.prompt(questions)
}
