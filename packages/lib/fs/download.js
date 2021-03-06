import shell from 'shelljs'

export default function download(type, name, ts) {
    var silentState = shell.config.silent
    shell.config.silent = true
    shell.exec(
        `curl https://codeload.github.com/1407arjun/create-any-app/tar.gz/main | tar -xz -C ${name} --strip=4 create-any-app-main/templates/${type}/${
            ts ? 'typescript' : 'default'
        }`
    )
    shell.config.silent = silentState
}
