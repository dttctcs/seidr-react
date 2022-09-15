# Seidr React

A react component library for Seidr

## Usage

**Seidr React** provides react components and hooks to interact with [**Seidr's**](https://github.com/dttctcs/seidr) features. :sparkles:

More components comming soon...

### Prerequisites

You have **Seidr** running? Good. All you need is to install **Seidr React** and leverage its components (See [Concepts](#Concepts) for more information).

- Create a react project
- Install requirements
  - Either `npm install git+ssh://git@github.com:dttctcs/seidr-react.git`
  - Or add `"seidr-react": "github:dttctcs/seidr-react"` to your `package.json` dependency list and do `npm install`

## Contribution

### Development

- Install dependencies: `npm install`
- Run: `npm run storybook`

#### Creating a release

The inbuilt script uses Semantic Versioning according to https://semver.org/.

- Create a release: `npm run releae <version>` while version is one of patch/minor/major
- This will create a commit with the given release version as tag and project version and open the github release page after build. Select `Generate release notes` to create changelog based on commits and press `publish release`

### Production

- Install dependencies: `npm install`
- Run `npm run build`

### Release

- Install dependencies: `npm install`
- Run `npm run release`

## Configuration

### Basic

To leverage **Seidr React** wrap your react application with `SeidrProvider`. `SeidrProvider` has several props. The most important is `baseUrl`. Set it to your **Seidr** Backend URL. If not set, `SeidrProvider` will assume the `baseUrl` to be `window.location.origin`.

#### SeidrProvider

| prop                | value                        | description                                                                                                                                              |
| ------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| baseUrl             | string                       | The base URL of your **Seidr** application. (Example: www.domain.com/api/v1)                                                                             |
| theme               | object: ExtendedMantineTheme | A theme object to style Seidr components (Table) globally                                                                                                |
| inheritMantineTheme | boolean                      | Determines if a `MantineTheme` from an outer scope should be merged with **Seidr's** default theme or the `MantineTheme` provided (see `theme` property) |

### Components and Hooks

You now can use **Seidr React's** components and hooks anywhere in the application. **Seidr React** currently provides a single component and several hooks.

#### useSeidrInfo

Provides the `baseUrl` and information from **Seidr's** `InfoApi` throughout your application. `InfoApi` data will automatically retrieved, once the user is authenticated (WIP).

#### useSeidrAuth

Provides `user`, `error`, `isLoading`, `getUser`, `signin`, `signout`, `update`, `resetPassword` to interact with **Seidr's** authentication functionality. This hook will also trigger a rerender when `user`, `error` and `isLoading` change (react lifecycle).

#### useSeidrTheme

Provides the merged `MantineThme` throughout your application.

#### SeidrApiProvider

`SeidrApiProvider` interacts with **Seidr's** `BaseModelRestApi`. Path should be the same as `resource_name` used in `BaseModelRestApi`.

| prop        | value               | description                                                                                                                                                                |
| ----------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| path        | string              | The path segment to add to the `baseUrl` provided to SeidrProvider. The resulting url should point to a valid **Seidr** base route. Will ignore `baseUrl`, if it is a URL. |
| settings    | object: Settings    | Style settings                                                                                                                                                             |
| queryParams | object: QueryParams | Control filters (triggers rerender) externally                                                                                                                             |
| relation    | object: Filter      | A base filter to apply (currently used in the context of RelatedAPIs)                                                                                                      |

#### useTable

Provides `data`, `info`, `queryParams`, `path`, `getEntry`, `addEntry`, `setQueryParams`, `getEntry`, `addEntry`, `updateEntry`, `deleteEntry` to interact with **Seidr's** `BaseModelRestApi`. Setting `queryParams` via `setQueryparams` will trigger an update of `data`.

Can only be used inside of `SeidrApiProvider`.

#### Table

A table component that leverages `useTable` internally. Use this, if you don't want to implement your own table.

| prop          | value               | description                                                                                        |
| ------------- | ------------------- | -------------------------------------------------------------------------------------------------- |
| hideToolbar   | boolean             | Hide toolbar, the toolbar is the upper section containing Settings, Add and Filter                 |
| hideFilter    | boolean             | Hide filter                                                                                        |
| hideSettings  | boolean             | Hide settings                                                                                      |
| hideActions   | boolean             | Hide action column on every row                                                                    |
| settings      | object: Settings    | Style settings                                                                                     |
| onError       | function            | Callback to be fired on Table error                                                                |
| onSelectEntry | function            | Callback to be fired on entry selection (Will apply selection styles to rows)                      |
| styles        | object: TableStyles | Interface to style Table (based on [Mantine's StylesAPI](https://mantine.dev/theming/styles-api/)) |

## Concepts

### SeidrApiProvider

`SeidrApiProvider` relies on an implementation of **Seidr's** `BaseModelRestApi`. Just provide the `resource_name` used in the implementation of the `BaseModelRestApi` and (assuming the paths are correct) enjoy the power of `SeidrApiProvider`.

### Authentication

`useSeidrAuth` assumes the presence of `AuthApi` provided by **Seidr** in your backend. Given this and correctly set paths, you gain the full capability of a session based authentication feature which has the same (except OIDC) functionality as [Flask Appbuilder's](https://flask-appbuilder.readthedocs.io/en/latest/security.html)

### Styling

**Seidr React** provides the same StylesAPI as on [Mantine](https://mantine.dev/theming/styles-api/). This is a work in progress...
