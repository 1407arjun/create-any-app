import inquirer from 'inquirer'

export default function state() {
    const questions = [
        {
            type: 'list',
            name: 'state',
            message: 'Pick a state-management library:',
            choices: [
                {
                    name: 'React-Redux',
                    value: 'reactRedux'
                },
                {
                    name: 'Redux',
                    value: 'redux'
                }
            ],
            default: 0
        }
    ]

    return inquirer.prompt(questions)
}
