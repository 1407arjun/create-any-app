import Conf from 'conf'

const config = new Conf({
    projectName: 'create-any-app'
})

if (!config.get('presets')) config.set('presets', [])

export default config
