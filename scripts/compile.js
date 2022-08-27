// @ts-check

const { join } = require('path');
const { exec } = require('pkg');

const DIST_DIR = join(__dirname, '..', 'packages', 'minimon-server', 'dist');
const OUTPUT_DIR = join(__dirname, '..', 'build');

const SCRIPTS_GLOB = join(DIST_DIR, '**', '*.js');
const ASSETS_GLOB = join(DIST_DIR, 'client', '**');

const BUILD_TARGETS = [
  ['node16-alpine-x64', 'minimon-alpine-x64'],
  ['node16-alpine-arm64', 'minimon-alpine-arm64'],
  ['node16-linux-x64', 'minimon-linux-x64'],
  ['node16-linux-arm64', 'minimon-linux-arm64'],
  ['node16-win-x64', 'minimon-windows-x64'],
  ['node16-win-arm64', 'minimon-windows-arm64'],
  ['node16-macos-x64', 'minimon-macos-x64'],
  ['node16-macos-arm64', 'minimon-macos-arm64'],
];

const compile = async () => {
  for (const [target, output] of BUILD_TARGETS) {
    const command = [
      join(DIST_DIR, 'main.js'),
      '--scripts',
      SCRIPTS_GLOB,
      '--target',
      target,
      '--output',
      output,
      '--assets',
      ASSETS_GLOB,
    ];

    await exec(command);
  }
};

compile()
  .then(() => console.log('Compiled'))
  .catch((e) => console.error(e));
