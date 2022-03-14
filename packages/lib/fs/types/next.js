import download from '../download.js'

export default function next(name, settings) {
    download(
        'next',
        name,
        settings.ts && settings.ts.use ? settings.ts.use : false
    )
    console.log(settings)
}
