#!/usr/bin/env node

(function () {
  const path = require('path');
  const stylelint  = require('stylelint');
  const stylelintFormatterPretty = require('stylelint-formatter-pretty');
  const { ArgumentParser } = require('argparse');

  // Load package config
  const packageConfig = path.resolve(__dirname, '../package.json');
  const packageInfo = require(packageConfig);

  // Configure arguments
  const parser = new ArgumentParser({
    version: packageInfo.version,
    description: packageInfo.description,
  });
  parser.addArgument(['--paths'], {
    help: 'Define search paths, comma separated. Default "src/"',
    defaultValue: 'src/',
  });

  // Check arguments
  const args = parser.parseArgs();

  // Create file globs of all paths
  const globs = [];
  const extensions = ['.pcss', '.css'];

  for (const extension of extensions) {
    for (const folderPath of args.paths.split(',')) {
      const folder = path.resolve(process.cwd(), folderPath);
      globs.push(path.resolve(folder, `*${extension}`));
      globs.push(path.resolve(folder, '**', `*${extension}`));
    }
  }

  console.log(`\x1b[34m ➜ Running Stylelint.\x1b[0m`);

  // Load stylelint config
  const configPath = path.resolve(__dirname, '../.stylelintrc.json');
  const baseConfig = require(configPath);

  // Lint
  stylelint.lint({
    config: baseConfig,
    files: globs,
    formatter: stylelintFormatterPretty,
  }).then((data) => {
    if (data.errored) {
      console.log(data.output);
      process.exit(1);
    }

    console.log(`\x1b[32m ✔ No Stylelint errors.\x1b[0m`);
  });
}());
