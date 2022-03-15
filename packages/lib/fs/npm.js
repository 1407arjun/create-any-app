export const npm = {
    tw: ['tailwindcss'],
    bs: ['bootstrap'],
    ckui: [
        '@chakra-ui/react',
        '@emotion/react@^11',
        '@emotion/styled@^11',
        'framer-motion@^6'
    ],
    sass: ['sass'],
    less: ['less'],
    styl: ['stylus'],
    esDefault: ['eslint', 'eslint-plugin-import', 'eslint-config-next'],
    esAirbnb: [
        'eslint',
        'eslint-plugin-import',
        'eslint-config-airbnb',
        'eslint-config-next'
    ],
    esStandard: [
        'eslint',
        'eslint-plugin-import',
        'eslint-config-standard',
        'eslint-config-next'
    ],
    esPrettier: [
        'eslint',
        'eslint-plugin-import',
        'eslint-config-prettier',
        'eslint-plugin-prettier',
        'eslint-config-next'
    ],
    reduxToolkit: ['@reduxjs/toolkit', 'react-redux']
}

export const npmTypes = {
    reduxToolkit: ['@types/react-redux']
}
