# 🚀 Typescript React Starter Kit

[![Dependency Status](https://david-dm.org/shahirov/starter-kit.svg)](https://david-dm.org/shahirov/starter-kit)
[![devDependency Status](https://david-dm.org/shahirov/starter-kit/dev-status.svg)](https://david-dm.org/shahirov/starter-kit?type=dev)
[![Known Vulnerabilities](https://snyk.io/test/github/shahirov/starter-kit/badge.svg)](https://snyk.io/test/github/shahirov/starter-kit)

## Technology stack

This starter kit uses the following libraries and tools:

- [TypeScript](https://www.typescriptlang.org/)
- [PostCSS](https://github.com/postcss/postcss)
- [Babel](https://github.com/babel/babel)
- [Webpack](https://github.com/webpack/webpack) for bundling
- [React](https://github.com/facebook/react) & [React DOM](https://github.com/facebook/react) for views
- [React Router](https://github.com/ReactTraining/react-router) handles in-app routing
- [Effector](https://github.com/effector/effector) manages application state
- [Effector React](https://github.com/effector/effector) to use effector-react bindings
- [Styled Components](https://github.com/styled-components) allows styling components in JS
- [ESLint](https://github.com/eslint/eslint) for linting JS/TS
- [Jest](https://github.com/facebook/jest) as test runner
- [TS Jest](https://github.com/kulshekhar/ts-jest) as Jest preprocessor
- [React Testing Library](https://github.com/testing-library/react-testing-library) for asserting React Components

## Installation

1. Make sure you have Node.js v12.18.0 and npm v6 or above installed
2. Clone this repo using `git clone https://github.com/shahirov/starter-kit.git`
3. Move to the appropriate directory: `cd starter-kit`<br />
4. Run `npm install` in order to install dependencies<br />
5. Now you can run `npm start` to see the example app at `http://localhost:8000`

## Available Scripts

In the project directory, you can run:

- `npm start` - runs the app in the development mode
- `npm run build` - builds the app for production
- `npm run build-analyze` - open bundle analyzer in browser
- `npm run qa` - run code quality tools
- `npm run fix` - fix linting errors
- `npm run lint` - run linters
- `npm run eslint` - run ESLint
- `npm run ts` - run TypeScript checks
- `npm run ts-files` - list TypeScript files
- `npm run ts-coverage` - show TypeScript coverage
- `npm run codestyle` - checks code style with prettier
- `npm run format` - format files with prettier
- `npm run test` - launches the test runner
- `npm run test-silent` - launches the test runner and show errors only
- `npm run test-coverage` - show test coverage


## Extra features

- hot reload
- bundle visualizer
- pre-commit formatting
- TypeScript module resolver
- filenames linting
- jest coverage
- typescript coverage
- root alias support
