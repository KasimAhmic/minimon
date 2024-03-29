// @ts-check

const CracoEsbuildPlugin = require('craco-esbuild');

module.exports = {
  plugins: [
    {
      plugin: CracoEsbuildPlugin,
      options: {
        enableSvgr: true,
        esbuildLoaderOptions: {
          loader: 'tsx',
          target: 'es2020',
        },
        esbuildMinimizerOptions: {
          target: 'es2020',
          css: true,
        },
        skipEsbuildJest: true,
        esbuildJestOptions: {
          loaders: {
            '.ts': 'ts',
            '.tsx': 'tsx',
          },
        },
      },
    },
  ],
};
