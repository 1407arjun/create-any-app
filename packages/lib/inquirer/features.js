import inquirer from 'inquirer'
import clear from 'clear'

export default function features() {
    clear()
    const questions = [
        {
            type: 'checkbox',
            name: 'features',
            message: 'Check the features needed for your project:',
            choices: [
                { name: 'Babel', value: 'babel', checked: true },
                { name: 'TypeScript', value: 'ts' },
                { name: 'Router', value: 'router', checked: true },
                { name: 'State Management', value: 'state' },
                { name: 'CSS Pre-processors', value: 'cssProc' },
                { name: 'CSS Frameworks', value: 'cssFrame' },
                {
                    name: 'Linter/Formatter',
                    value: 'linter',
                    checked: true
                },
                { name: 'Unit Testing', value: 'unit' }
            ],
            loop: false
        }
    ]
    return inquirer.prompt(questions)
}
