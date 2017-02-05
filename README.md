# react-playground

This is a WIP and just for fun! ⚽ not meant for prod use. At least not yet 😀

Simple React App that has:

- Bootstrap
- Development and production builds and watch tasks
- Hot Reloading
- Cache busting
- post css with Auto Prefixer, CSS next (CSS nesting and variables)

## Pending

- Tape unit testing / coverage
- i18n support
- React / Redux / React-Router demo

## Usage

Install dependencies with: 

```bash
yarn
```

You can start watching changes with `yarn start` or `yarn run start:prod`. (`:prod` will run with production settings).

Similarly, if you just want to run the build once and not spin up a development server you can run:

```bash
yarn build
```

(or `yarn build:prod`).

The generated files will be added to the `/dist` folder
