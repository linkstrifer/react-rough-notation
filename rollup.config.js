import resolve from '@rollup/plugin-node-resolve'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import commonJS from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'

import pkg from './package.json'

export default {
  external: ['rough-notation'],
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      strict: false,
    },
    {
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal({}),
    resolve(),
    commonJS({
      include: 'node_modules/**',
    }),
    typescript({
      useTsconfigDeclarationDir: true,
    }),
  ],
}
