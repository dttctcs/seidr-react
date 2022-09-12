# Seidr UI

A react component library for Seidr

## Usage

**Seidr UI** provides react components and hooks to interact with [**Seidr's**](https://github.com/dttctcs/seidr) features. :sparkles:

More components comming soon...

### Prerequisites

You have **Seidr** running? Good. All you need is to install **Seidr UI** and leverage its components (See [Concepts](#Concepts) for more information).

- Create a react project
- Install requirements
  - Either `npm install git+ssh://git@github.com:dttctcs/seidrui.git`
  - Or add `"seidrui": "github:dttctcs/seidrui"` to your `package.json` dependency list and do `npm install`

## Contribution

### Development

- Install dependencies: `npm install`
- Run: `npm run storybook`

### Production

- Install dependencies: `npm install`
- Run `npm run build`

### Release

- Install dependencies: `npm install`
- Run `npm run release`

## Configuration

### Basic

To leverage **Seidr UI** wrap your react application with `SeidrProvider`. `SeidrProvider` has several props. The most important is `baseURL`. Set it to your **Seidr** Backend URL. If not set, `SeidrProvider` will assume the `baseURL` to be `window.location.origin`.

#### SeidrProvider

| prop                | value                        | description                                                                                                                                              |
| ------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| baseURL             | string                       | The base URL of your **Seidr** application. (Example: www.domain.com/api/v1)                                                                             |
| theme               | object: ExtendedMantineTheme | A theme object to style Seidr components (Table) globally                                                                                                |
| inheritMantineTheme | boolean                      | Determines if a `MantineTheme` from an outer scope should be merged with **Seidr's** default theme or the `MantineTheme` provided (see `theme` property) |

### Components and Hooks

You now can use **Seidr UI's** components and hooks anywhere in the application. **Seidr UI** currently provides a single component and several hooks.

#### Table

| prop             | value               | description                                                                                                                     |
| ---------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| path             | string              | The path segment to add to the `baseURL`. The resulting url should point to a valid **Seidr** base route                        |
| fitToParent      | boolean             | Size to be controlled by parent                                                                                                 |
| hideToolbar      | boolean             | Hide toolbar, the toolbar is the upper section containing Settings, Add and Filter                                              |
| hideFilter       | boolean             | Hide filter                                                                                                                     |
| hideSettings     | boolean             | Hide settings                                                                                                                   |
| hideActions      | boolean             | Hide action column on every row                                                                                                 |
| settings         | object: Settings    | Style settings                                                                                                                  |
| queryParams      | object: QueryParams | Control filters (triggers rerender) externally                                                                                  |
| rowsPerPageProps | boolean             | Control page size (triggers rerender)                                                                                           |
| relation         | object: Filter      | A base filter to apply (currently used in the context of RelatedAPIs)                                                           |
| AddComponent     | ReactElement        | ReactNode to be rendered on item add. (will provide add info to the component as properties (columns, schema, defaultValues)).  |
| EditComponent    | ReactElement        | ReactNode to be rendered on item edit. (will provide edit info to the component as properties (columns, schema, defaultValues)) |
| ViewComponent    | ReactElement        | ReactNode to be rendered on item view (will provide the selected item to the component)                                         |
| onError          | function            | Callback to be fired on Table error                                                                                             |
| onSelectEntry    | function            | Callback to be fired on entry selection (Will apply selection styles to rows)                                                   |
| styles           | object: TableStyles | Interface to style Table (based on [Mantine's StylesAPI](https://mantine.dev/theming/styles-api/))                              |

#### useSeidrInfo

Provides the `baseURL` and information from **Seidr's** `InfoApi` throughout your application. `InfoApi` data will automatically retrieved, once the user is authenticated (WIP).

#### useSeidrAuth

Provides `user`, `error`, `isLoading`, `getUser`, `signin`, `signout`, `update`, `resetPassword` to interact with **Seidr's** authentication functionality. This hook will also trigger a rerender when `user`, `error` and `isLoading` change (react lifecycle).

#### useSeidrApi

Provides all necessary functions `fetchInfo`, `fetchList`, `fetchEntry`, `createEntry`, `updateEntry`, `deleteEntry` to interact with **Seidr's** `BaseModelRestApi`.

#### useSeidrTheme

Provides the merged `MantineThme` throughout your application.

## Concepts

### Table

`Table` relies on an implementation of **Seidr's** `BaseModelRestApi`. Just provide the `resource_name` used in the implementation of the `BaseModelRestApi` and (assuming the paths are correct) enjoy the power of `Table`.

`Table` leverages `useSeidrApi` internally. Meaning, you can interact with your `BaseModleRestApi` implementatoin using the api methods provided by `useSeidrApi`. Or write your own code to interact with your backend.

### Authentication

`useSeidrAuth` assumes the presence of `AuthApi` provided by **Seidr** in your backend. Given this and correctly set paths, you gain the full capability of a session based authentication feature which has the same (except OIDC) functionality as [Flask Appbuilder's](https://flask-appbuilder.readthedocs.io/en/latest/security.html)

### Styling

**Seidr UI** provides the same StylesAPI as on [Mantine](https://mantine.dev/theming/styles-api/). This is a work in progress...
