import resolve from '@rollup/plugin-node-resolve'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import commonJS from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'

import pkg from './package.json'

export default {
  external: ['rough-notation'],
  input: 'src/index.ts',
  strictDeprecations: true,
  output: [
    {
      banner: `'use client';`,
      exports: 'named',
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
      strict: false,
    },
    {
      banner: `'use client';`,
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
