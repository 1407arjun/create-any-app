import fs from 'fs'
import path from 'path'

export default function remove(src) {
    fs.readdirSync(src).forEach((file) => {
        if (file.slice(0, 2) === '--')
            fs.rmSync(path.join(src, file), { recursive: true })
    })
}
