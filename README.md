# Seidr React

A react component library for Seidr

## Usage

**Seidr React** provides react components and hooks to interact with [**Seidr's**](https://github.com/dttctcs/seidr) features. :sparkles:

More components coming soon...

### Prerequisites

You have **Seidr** running? Good. All you need is to install **Seidr React** and leverage its components (See [Concepts](#Concepts) for more information).

- Create a react project
- Install requirements
  - Either `npm install git+ssh://git@github.com:dttctcs/seidr-react.git`
  - Or add `"seidr-react": "github:dttctcs/seidr-react"` to your `package.json` dependency list and do `npm install`

## Contribution

### Development

- Install dependencies: `npm ci`\*

- Run: `npm run storybook`

_\*`npm i` will update `package-lock.json` if changes occured, while `npm ci` will wipe your `node_modules` folder and install dependencies only from `package-lock.json` (opt for `npm ci` when possible)_

### Release

The project uses Semantic Versioning according to https://semver.org/.

- Create a tag: `git tag <version>`, where `<version>` is a semver version number (without the prefix `v`)
- Push your tag: `git push --tag`
  - This will run the github workflow `build-and-release`, which builds the application and publishes it to github. It will also create a release on github with the commit log since the last release

## Configuration

### Basic

To leverage **Seidr React** wrap your react application with `SeidrProvider`. `SeidrProvider` has several props. The most important is `baseUrl`. Set it to your **Seidr** Backend URL. If not set, `SeidrProvider` will assume the `baseUrl` to be `window.location.origin`.

#### SeidrProvider

| prop                | value                        | description                                                                                                                                              |
| ------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| baseUrl             | string                       | The base URL of your **Seidr** application. (Example: www.domain.com/api/v1)                                                                             |
| theme               | object: ExtendedMantineTheme | A theme object to style Seidr components (DataGrid) globally                                                                                             |
| inheritMantineTheme | boolean                      | Determines if a `MantineTheme` from an outer scope should be merged with **Seidr's** default theme or the `MantineTheme` provided (see `theme` property) |

### Components and Hooks

You now can use **Seidr React's** components and hooks anywhere in the application. **Seidr React** currently provides a single component and several hooks.

#### useSeidrInfo

Provides the `baseUrl` and information from **Seidr's** `InfoApi` throughout your application. `InfoApi` data will automatically retrieved, once the user is authenticated (WIP).

#### useSeidrAuth

Provides `user`, `error`, `loading`, `getUser`, `signin`, `signout`, `update`, `resetPassword` to interact with **Seidr's** authentication functionality. This hook will also trigger a rerender when `user`, `error` and `loading` change (react lifecycle).

#### useSeidrTheme

Provides the merged `MantineThme` throughout your application.

#### SeidrApiProvider

`SeidrApiProvider` interacts with **Seidr's** `BaseModelRestApi`. Path should be the same as `resource_name` used in `BaseModelRestApi`.

| prop        | value               | description                                                                                                                                                                |
| ----------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| path        | string              | The path segment to add to the `baseUrl` provided to SeidrProvider. The resulting url should point to a valid **Seidr** base route. Will ignore `baseUrl`, if it is a URL. |
| settings    | object: Settings    | Style settings                                                                                                                                                             |
| initialQueryParams | object: QueryParams | Set initial query parameters                                                                                                                           |
| relation    | object: Filter      | A base filter to apply (currently used in the context of RelatedAPIs)                                                                                                      |

#### useApi

Provides `path`, `data`, `info`, `queryParams`, `loading`, `error`, `setQueryParams`, `getEntry`, `addEntry`, `updateEntry`, `deleteEntry` to interact with **Seidr's** `BaseModelRestApi`. Setting `queryParams` via `setQueryparams` will trigger an update of `data`.

Can only be used inside of `SeidrApiProvider`.

#### DataGrid

A feature rich table component that leverages `useApi` internally. Use this, if you don't want to implement your own table.

| prop          | value                  | description                                                                                           |
| ------------- | ---------------------- | ----------------------------------------------------------------------------------------------------- |
| fetchOnMount  | boolean                | Determines if DataGrid should trigger a load on mount, defaults to true                               |
| hideToolbar   | boolean                | Hide toolbar, the toolbar is the upper section containing Settings, Add and Filter                    |
| hideFilter    | boolean                | Hide filter                                                                                           |
| hideSettings  | boolean                | Hide settings                                                                                         |
| hideActions   | boolean                | Hide action column on every row                                                                       |
| settings      | object: Settings       | Style settings                                                                                        |
| onSelectEntry | function               | Callback to be fired on entry selection (Will apply selection styles to rows)                         |
| styles        | object: DataGridStyles | Interface to style DataGrid (based on [Mantine's StylesAPI](https://mantine.dev/theming/styles-api/)) |

#### UserMenu

Creates a dropdown according to Mantine's menu. The dropdown includes links to `react-router` routes with the following paths:

- `/users`
- `/roles`
- `/permissions`
- `/viewmenus`
- `/permissionviews`

These paths will be appended the provided `basePath`.

| prop     | value     | description                                                                               |
| -------- | --------- | ----------------------------------------------------------------------------------------- |
| basePath | string    | Determines the base path to append the routes' paths to, defaults to `/security`          |
| Target   | ReactNode | A react element to render instead of the default button                                   |
| children | ReactNode | A set of mantine's `Menu.Divider`, `Menu.Label` and `Menu.Item` to append to the dropdown |

### SeidrApiProvider

`SeidrApiProvider` relies on an implementation of **Seidr's** `BaseModelRestApi`. Just provide the `resource_name` used in the implementation of the `BaseModelRestApi` and (assuming the paths are correct) enjoy the power of `SeidrApiProvider`.

### Authentication

`useSeidrAuth` assumes the presence of `AuthApi` provided by **Seidr** in your backend. Given this and correctly set paths, you gain the full capability of a session based authentication feature which has the same (except OIDC) functionality as [Flask Appbuilder's](https://flask-appbuilder.readthedocs.io/en/latest/security.html)

### Styling

**Seidr React** provides the same StylesAPI as on [Mantine](https://mantine.dev/theming/styles-api/). This is a work in progress...
