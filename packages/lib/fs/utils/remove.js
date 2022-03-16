import fs from 'fs-extra'
import path from 'path'

export default function remove(src) {
    fs.readdirSync(src).forEach((file) => {
        if (file.slice(0, 2) === '--') fs.removeSync(path.join(src, file))
    })
}
