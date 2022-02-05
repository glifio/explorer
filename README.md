# Glif Explorer

<!-- Glif art/branding -->


The Glif Explorer is a Filecoin analytics UI built with Next.js

### A huge thank you to the [Lily](https://lilium.sh/lily/) team from Protocol Labs for building our high confidence dataset.

#### Filecoin module package local development

In order to develop packages locally and see the changes live in this local wallet repository, the [npm link](https://docs.npmjs.com/cli/v7/commands/npm-link) tool can be used to symlink to the packages in your local modules repo.

Package linking is a two-step process.

First, from your local package folder, run:
```
npm link
```

Next, from this main wallet repository, run:
```
npm link @glif/<package-name>
```
for example, use `npm link @glif/react-components` to symlink the `react-components` package to your local version. See the npm link docs for details.
