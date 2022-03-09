import inquirer from 'inquirer'

export default function linter() {
    const questions = [
        {
            type: 'list',
            name: 'linter',
            message: 'Pick a linter/formatter config:',
            choices: [
                {
                    name: 'ESLint with error prevention only',
                    value: 'esError'
                },
                {
                    name: 'ESLint default config',
                    value: 'esDefault'
                },
                { name: 'ESLint + Airbnb config', value: 'esAirbnb' },
                { name: 'ESLint + Standard config', value: 'esStandard' },
                { name: 'ESLint + Prettier', value: 'esPrettier' }
            ],
            default: 0
        }
    ]

    return inquirer.prompt(questions)
}
