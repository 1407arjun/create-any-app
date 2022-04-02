export default {
    frontend: {
        types: [{ name: 'next', value: 'Next.js' }],
        features: [
            //{ name: 'Babel', value: 'babel', checked: true },
            { name: 'TypeScript', value: 'ts' },
            { name: 'Router', value: 'router', checked: true },
            { name: 'State Management', value: 'state' },
            { name: 'CSS Pre-processors', value: 'cssProc' },
            { name: 'CSS Frameworks', value: 'cssFrame' },
            {
                name: 'Linter/Formatter',
                value: 'linter',
                checked: true
            }
            //{ name: 'Unit Testing', value: 'unit' }
        ]
    },
    backend: { types: [{ name: 'express', value: 'Express.js' }] }
}
