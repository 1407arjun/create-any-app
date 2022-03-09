import inquirer from 'inquirer'

export default function unit() {
    const questions = [
        {
            type: 'list',
            name: 'unitLib',
            message: 'Pick unit testing solution:',
            choices: [
                { name: 'Jest', value: 'jest' },
                { name: 'Mocha + Chai', value: 'mocha' }
            ],
            default: 0
        }
    ]
    return inquirer.prompt(questions)
}
