import conf from 'conf'

export default async function preset(preset, name, options) {
    console.log('create-any-app v0.1.0')

    let settings = {}

    if (fs.existsSync(name)) {
        const res = await dir(name)
        if (res.dir === 'overwrite') settings = conf.get(`presets.${preset}`)
        else process.exit(0)
    } else settings = conf.get(`presets.${preset}`)

    if (!options.git) settings = { ...settings, git: false }
    else settings = { ...settings, git: true }

    return settings
}
