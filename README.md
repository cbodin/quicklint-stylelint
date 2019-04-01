Quicklint Stylelint
======
A CLI wrapping a simple stylelint config based on [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard).

The rules/options that differ from the standard:
- [value-no-vendor-prefix](https://stylelint.io/user-guide/rules/value-no-vendor-prefix/) set to `true` as [autoprefixer](https://github.com/postcss/autoprefixer) should be used
- [property-no-vendor-prefix](https://stylelint.io/user-guide/rules/property-no-vendor-prefix/) set to `true` as [autoprefixer](https://github.com/postcss/autoprefixer) should be used


Installation
------
Add the package as a dev dependency:
```bash
npm i -D github:cbodin/quicklint-stylelint#v1.1.0
```


Usage
------
The default behavior is to lint all the `.pcss`, `.css` and `.vue` files in the `src/` folder.
If any other folders should be used, the search paths can be specified with the `--paths` argument.

To include both the default `src/` folder and a `server/` folder, both paths will need to be supplied:
```bash
quicklint-stylelint --paths src/,server/
```

Run `npx quicklint-stylelint -h` for a list of all options.

A common scenario is to include a test script in your `package.json` file:
```json
{
  "scripts": {
    "test": "quicklint-stylelint"
  }
}
```
