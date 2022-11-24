# Seidr React

A react component library for [Seidr](https://github.com/dttctcs/seidr).

## Actions

![build-and-release](https://github.com/dttctcs/seidr-react/actions/workflows/build-and-release.yml/badge.svg)

## Usage

**Seidr React** provides react components and hooks to interact with **Seidr's** features.

### Prerequisites

You have **Seidr** running? Good. All you need is to install **Seidr React** and leverage its components.

- [Create a react project](https://create-react-app.dev/)
- Install requirements
    - Either run `npm install git+ssh://git@github.com:dttctcs/seidr-react.git`
    - Or add `"seidr-react": "github:dttctcs/seidr-react"` to your `package.json` dependencies list and
      run `npm install`

## Contribution

### Development

- Install dependencies[^install_dependencies]:
    - Run `npm ci`, if you want to install the current version without any changes.
    - Run `npm i`, if you intend to update/change dependencies or the version.
- Run: `npm run storybook`

### Release

The project uses [Semantic Versioning](https://semver.org/).

- Create a tag: `git tag <version>`, where `<version>` is a semver version number (without the prefix `v`)
- Push your tag: `git push --tag`
    - This will run the GitHub workflow `build-and-release`, which builds the application and publishes it to GitHub. It
      will also create a release on GitHub with the commit log since the last release.

## Configuration

### Basic

To leverage **Seidr React** wrap your react application with `SeidrProvider`. `SeidrProvider` has several props, of
which `baseUrl` is the most important. Set it to your **Seidr** backend URL. If not set, `SeidrProvider` will assume
the `baseUrl` to be `window.location.origin`.

#### SeidrProvider

| prop                | value                        | description                                                                                                                                              |
|---------------------|------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| baseUrl             | string                       | The base URL of your **Seidr** application. (Example: www.domain.com/api/v1)                                                                             |
| theme               | object: MantineThemeOverride | A theme object to style Seidr components (e.g. DataGrid) globally                                                                                        |
| inheritMantineTheme | boolean                      | Determines if a `MantineTheme` from an outer scope should be merged with **Seidr's** default theme or the `MantineTheme` provided (see `theme` property) |

### Components and Hooks

You now can use **Seidr React's** components and hooks anywhere in the application.

#### Hooks

##### useSeidrInfo

Provides the `baseUrl` and information from **Seidr's** `SeidrInfo` throughout your application. `SeidrInfo` data will
automatically retrieved, once the user is authenticated.

##### useSeidrTheme

Provides the merged `MantineTheme` throughout your application.

##### useSeidrAuth

Provides `user`, `error`, `loading`, `signin`, `signout`, `update`, `resetPassword` to interact with ** Seidr's**
authentication functionality. This hook will also trigger a rerender when `user`, `error` and `loading` change (react
lifecycle).

#### useApi[^inside_seidr_api_provider]

Provides `path`, `data`, `info`, `queryParams`, `loading`, `error`, `setQueryParams`, `getEntry`, `addEntry`
, `updateEntry`, `deleteEntry` to interact with **Seidr's** `BaseModelRestApi`. Setting `queryParams`
via `setQueryParams` will trigger an update of `data`.

#### Components

##### UserMenu

Creates a dropdown according to Mantine's menu. The dropdown includes links to `react-router` routes with the following
paths:

- `/users`
- `/roles`
- `/permissions`
- `/viewmenus`
- `/permissionviews`

These paths will be appended to the provided `basePath`.

| prop     | value     | description                                                                               |
|----------|-----------|-------------------------------------------------------------------------------------------|
| basePath | string    | Determines the base path to append the routes' paths to, defaults to `/security`          |
| Target   | ReactNode | A react element to render instead of the default button                                   |
| children | ReactNode | A set of mantine's `Menu.Divider`, `Menu.Label` and `Menu.Item` to append to the dropdown |

##### SeidrApiProvider

`SeidrApiProvider` interacts with **Seidr's** `BaseModelRestApi`. Path should be the same as `resource_name` used
in `BaseModelRestApi`.

| prop               | value               | description                                                                                                                                                                |
|--------------------|---------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| path               | string              | The path segment to add to the `baseUrl` provided to SeidrProvider. The resulting url should point to a valid **Seidr** base route. Will ignore `baseUrl`, if it is a URL. |
| relation           | object: Relation    | A base filter to apply (currently used in the context of RelatedAPIs)                                                                                                      |
| initialQueryParams | object: QueryParams | Set initial query parameters                                                                                                                                               |

##### DataGrid[^inside_seidr_api_provider]

A feature rich table component that leverages `useApi` internally. Use this, if you don't want to implement your own
table.

| prop               | value                  | description                                                                                            |
|--------------------|------------------------|--------------------------------------------------------------------------------------------------------|
| hideToolbar        | boolean                | Hide toolbar, the toolbar is the upper section containing Settings, Add and Filter                     |
| hideFilter         | boolean                | Hide filters                                                                                           |
| hideSettings       | boolean                | Hide settings                                                                                          |
| hideActions        | boolean                | Hide Action column on every row                     >                                                  |
| settings           | object: Settings       | Style settings                                                                                         |
| rowsPerPageProps   | number                 | Externally control page size                                                                           |
| fetchOnMount       | boolean                | Determines if the table should trigger a data fetch on mount, defaults to true                         |
| onSelectEntry      | function               | Callback to be fired on entry selection                                                                |
| styles             | object: DataGridStyles | Interface to style DataGrid (based on [Mantine's StylesAPI](https://mantine.dev/theming/styles-api/))  |

##### Quick Filter

| prop | value  | description                                                  |
|------|--------|--------------------------------------------------------------|
| name | string | Name of the quick filter to leverage provided by the backend |

###### CheckBoxGroup[^mantine_checkbox_group_props]

Creates a [Mantine Checkbox.Group](https://mantine.dev/core/checkbox/#checkboxgroup) based on a quick filter of the
type `multiselect` that creates a new filter of the type {col: <quickfilter.column>, opr: 'in', value: <selectedValues>
} (FilterIn) if it doesn't exist, else updates it.

###### MultiSelect[^mantine_multiselect_props]

Creates a [Mantine MultiSelect](https://mantine.dev/core/multi-select/) based on a quick filter of the
type `multiselect` that creates a new filter of the type {col: <quickfilter.column>, opr: 'in', value: <selectedValues>
} (FilterIn) if it doesn't exist, else updates it.

### Authentication

`useSeidrAuth` assumes the presence of `AuthApi` provided by **Seidr** in your backend. Given this and correctly set
paths, you gain the full capability of a session based authentication feature which has the same (except OIDC)
functionality as [Flask Appbuilder's](https://flask-appbuilder.readthedocs.io/en/latest/security.html)

### Styling

**Seidr React** provides the same StylesAPI as on [Mantine](https://mantine.dev/theming/styles-api/).

[^install_dependencies]: `npm i` will update `package-lock.json` if changes occured, while `npm ci` will wipe
your `node_modules` folder and install dependencies only from `package-lock.json`
[^inside_seidr_api_provider]: Can only be used inside of `SeidrApiProvider`.
[^mantine_checkbox_group_props]: Also supports any prop
for [Mantine's CheckBox.Group](https://mantine.dev/core/checkbox/?t=props)
[^mantine_multiselect_props]: Also supports any prop
for [Mantine's CheckBox.Group](https://mantine.dev/core/multi-select/?t=props)