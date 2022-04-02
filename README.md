# Create Any App

Create Any App is a command line interface for rapid creation, configuration and development of JavaScript apps.

## Quick Start

```sh
npx create-any-app <framework> my-app
```

> If you've previously installed `create-any-app` globally via `npm install -g create-any-app`, we recommend you uninstall the package using `npm uninstall -g create-any-app` to ensure that `npx` always uses the latest version.

Check out the package README [here](packages/README.md).

## Templates

All templates used can be found in the `templates` directory. The following conventions are followed:

-   All templates for a particular framework are located at `templates/<framework>`
-   Each framework template directory contains two main subdirectories - `default` and `typescript` for the JavaScript and TypeScript base versions respectively.
-   Directories starting with `--` contain the files for the particular configuration corresponding to the name of the directory which are either added or overwritten during configuration. (For example `--tw` would contain files for TailwindCSS.)
-   The templates do not contain a `package.json` file as they are generated when the project is initialized.

### Local Development

To get a local copy up and running follow these simple steps.

#### Prerequisites

In order to get a copy of the project you will require you to have Node.js (v14+) and the NPM package manager installed. If you don't have it, you can download the latest version of Node.js from the [official website](https://nodejs.org/en/download/) which also installs the NPM package manager by default.

#### Installation

Open the terminal in the folder in which you wish to clone the repository and enter the following command:

```sh
git clone https://github.com/1407arjun/create-any-app.git
cd create-any-app
```

Install all the NPM packages:

```sh
cd packages
npm i
```

To add the project to PATH run:

```sh
npm link
```

Run on the command line:

```sh
create-any-app --help
```

#### Project Structure

```
create-any-app
├── README.md
├── LICENSE
├── CONTRIBUTING.md
├── .eslintrc.json
├── .prettierrc
├── packages
│   ├── bin
│   │   └── caa.js           //Entry point to the CLI
│   ├── data                 // Data about supported configurations
│   └── lib
│       ├── fs
│       │   ├── types        // File system operations specific to each framework
│       │   ├── utils        // Utility functions for file system operations
│       │   ├── download.js  // Function to download template from GitHub archive
│       │   ├── npm.js       // NPM packages corresponding to all configurations
│       │   └── main.js      // Entry point to project setup
│       ├── inquirer
│       │   ├── features     // Prompts for all configurations
│       │   ├── dir.js
│       │   └── features.js  // Prompt for main menu
│       ├── cli.js           // Entry point for any framework command
│       ├── create.js        // Entry point for create command
│       ├── preset.js        // Entry point for preset command
│       ├── settings.js      // Returns the configurations recorded from all prompts
│       └── conf.js          // Configure the conf package (for config files)
└── templates
    └── framework
        ├── default
        └── typescript
```

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**. Read [CONTRIBUTING.md](CONTRIBUTING.md).

1. Fork the Project. [(Refer the local development instructions)](#local-development)
2. Create your Feature Branch. (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes. (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch. (`git push origin feature/AmazingFeature`)
5. Open a Pull Request.

### Contributing to the templates

Following are some of the guidelines that have to be followed when creating/modifying a template:

-   The base versions of the templates (`default` or `typescript`) are generated from the default templates of the framework itself and have the same project structure except the `tsconfig.json` and other type decalaration files.
-   Modification or addition of configurations must be made in both, the `default` and `typescript` templates, so as to maintain the same structure and functionality across the base templates.
-   Create `--*` directories where necessary. The files in this directory will replace the default template files with the same name in its parent directory. (For example, if the default template contains an `index.js` file made using CSS and you want to add a TailwindCSS configuartion to it, then keep the `index.js` file as it is and in the same directory create a `--tw` directory and add an `index.js` file to it which is made with TailwindCSS)

### Contributing to the frameworks:

Following are some of the guidelines that have to be followed when adding/modifying a framework configuration:

-   If you are wanting to add a new framework, add the respective name, value pair to the corresponding catergory in `data/types.js` and also create a program command for the same as in `bin/caa.js`.
-   Add the base versions of the templates (`default` or `typescript`) which are generated from the default templates of the framework itself and have the same project structure except the `tsconfig.json` and other type decalaration files.
-   Add your framework as a seperate command to `bin/caa.js` and give it a type name to be used throughout the package.
-   Append the same name from the step above to the `switch` case in `main.js`.
-   Create a new file by the name of the framework from above inside `lib/fs/types` and add all the file operations required for various options to it. (Refer `lib/fs/types/next.js` as an example)
-   Use the functions provided under `lib/fs/util` to ease some of the file system operations.
-   Add the respective dependencies, dev dependencies and scripts for the framework in `data/npm.js`
-   Finally, follow the [guidelines](#contributing-to-the-templates) to modify the base templates to cater to all options.

### Contributing to configurations:

Following are some of the guidelines that have to be followed when adding/modifying a configuration:

-   Add/Modify the respective name, value pair in the `data/types.js` file under the corresponding category.
-   Next, if you wish to add a configuration to an existing one, then add the name, value pair to the respective file under `data/features`.
-   If you wish to add a new configuration, then create a file under `data/features` by the same name used in the value and add the corresponding data in it. Also export the same in `data/terms.js`.
-   For new configurations, also create an `inquirer` file under `lib/inquirer/features` and modify the `lib/settings.js` and `lib/preset.js` files as required by adding the new cases for the configuration.
-   Modify the respective affected file workflows in `lib/fs/types` as mentioned [here](#contributing-to-the-frameworks).
-   Finally, add the respective dependencies, dev dependencies and scripts (if any) for the configuration in `data/npm.js`.
