# Seidr UI

A react component library for Seidr

## Usage

**Seidr UI** provides react components to interact with [**Seidr's**](https://github.com/dttctcs/seidr) features. :sparkles:

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
- Run `npm run build` (see also https://create-react-app.dev/docs/production-build/)

## Concepts

A concept....a concept? Eh...

- _SeidrProvider_ to provide auth, baseURL, theme and styles to your application (or component subtree)
- _DataGrid_ API to interact with
