import conf from 'conf'

const schema = {
    presets: [
        {
            version: {
                type: 'number'
            },
            babel: {
                type: 'boolean',
                default: false
            },
            ts: {
                use: {
                    type: 'boolean',
                    default: false
                },
                babel: {
                    type: 'boolean',
                    default: false
                }
            }
        }
    ]
}
