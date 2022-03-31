# Getting Started with Create Any App

Create Any App is a command line interface for rapid creation, configuration and development of JavaScript apps.

## Quick Start

```sh
npx create-any-app <framework> my-app
```

> If you've previously installed `create-any-app` globally via `npm install -g create-any-app`, we recommend you uninstall the package using `npm uninstall -g create-any-app` to ensure that `npx` always uses the latest version.

### Get Started Immediately (using configuration mode)

You **don’t** need to install or configure tools like webpack or Babel. They are preconfigured and hidden so that you can focus on the code.

Create a project and configure its options else use a preset, and you’re good to go.

Run `create-any-app --help` for help with commands.

#### The following frameworks are supported:

-   Next.js

#### The following configurations are supported in configuration mode ([view details](#supported-configurations)):

-   TypeScript Support
-   Routers
-   State Management Tools
-   CSS Frameworks
-   CSS Preprocessors
-   Linters/Formatters

> When using configuration mode, you will be given an option to save the current configuration as a preset which can then be selected when running `create-any-app <framework> my-app` again or using the [command line directly](#selecting-a-preset-directly).

## Creating an App

**You’ll need to have Node >= 14 on your local development machine** (but it’s not required on the server). You can use [nvm](https://github.com/creationix/nvm#installation) (macOS/Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows) to switch Node versions between different projects.

To create a new app, you may choose one of the following methods:

### npx

```sh
npx create-any-app <framework> my-app
```

### Command line

`create-any-app` or `caa` can be used interchangably:

```sh
create-any-app <framework> my-app
```

##### OR

```sh
caa <framework> my-app
```

Follow the on screen instructions to get your app running once the configuration processes have completed.

### Selecting a preset directly

You can directly start a new app from a preset using the create command.

```sh
create-any-app create <preset-name> my-app
```

#### View all presets

List all presets using the `preset` command.

```sh
create-any-app preset
```

#### Removing a preset

Remove a preset using the `preset` command with the `--remove` or `-r` flag with the preset name as an argument.

```sh
create-any-app preset --remove <preset-name>
```

### Options

Optionally you can pass certain flags to the creation command to minimally configure projects without the configuration screen.

#### Creating a TypeScript app

You can start a new TypeScript app by using the `--typescript` or `-ts` to the creation command. This will create a new project with TypeScript using the default configurations.

```sh
npx create-any-app <framework> my-app --typescript
```

For advanced configurations, you can select the TypeScript option while configuring your project instead of the `--typescript` flag.

#### Initializing a Git repository

Create Any App by default initializes a Git repository in the project directory. If you don't wish to have this functionality just pass the `--no-git` flag to the creation command.

```sh
npx create-any-app <framework> my-app --no-git
```

```sh
npx create-any-app create <preset-name> my-app --no-git
```

## Scripts

Inside the newly created project, some built-in commands are added as per the chosen framework:

#### `npm start`

Starts the production server at a specified URL as per the chosen framework.

#### `npm test`

Runs the test watcher, if unit tests are configured.

#### `npm run build`

Builds the app for production to the default build folder of the chosen framework. It correctly bundles the app in production mode and optimizes the build for the best performance.

#### `npm run lint`

Runs the linter/formatter, if ESLint is configured.

Your app is ready to be deployed.

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**. Read [CONTRIBUTING.md](../CONTRIBUTING.md) and the [contributing guidelines](../README.md).

## Supported Configurations

#### TypeScript Support (Yes/No)

#### Routers (Default router provided by the framework, else React-Router)

#### State Management

-   Redux-Toolkit

#### CSS Frameworks

-   TailwindCSS
-   Chakra-UI

#### CSS Preprocessors

-   Sass/SCSS
-   Less
-   Stylus

#### Linters/Formatters

-   ESLint with default config
-   ESLint + Airbnb config
-   ESLint + Standard config
-   ESLint + Prettier
