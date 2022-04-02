import inquirer from 'inquirer'
import cssProcs from '../../../data/features/cssProcs.js'

export default function cssProc() {
    const questions = [
        {
            type: 'list',
            name: 'preProcessor',
            message: 'Pick a CSS pre-processor:',
            choices: cssProcs.preProcessors,
            default: 0
        }
    ]

    return inquirer.prompt(questions)
}
