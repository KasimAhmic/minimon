// @ts-check

import esbuild from 'rollup-plugin-esbuild';
import dts from 'rollup-plugin-dts';

const bundle = (config) => ({
  ...config,
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'cjs',
    exports: 'named',
    preserveModules: true,
    preserveModulesRoot: 'src',
  },
});

const config = [
  bundle({
    plugins: [esbuild({ target: 'es2019' })],
  }),
  bundle({
    plugins: [dts()],
  }),
];

export default config;
