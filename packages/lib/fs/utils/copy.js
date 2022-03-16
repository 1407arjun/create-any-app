import fs from 'fs'
import path from 'path'

export default function copy(src, dest) {
    if (fs.existsSync(src)) {
        fs.readdirSync(src).forEach((file) => {
            fs.copyFileSync(path.join(src, file), path.join(dest, file))
        })
    }
}
