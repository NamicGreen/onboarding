import typescript from 'rollup-plugin-typescript2'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import cleaner from 'rollup-plugin-cleaner'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import packageJson from './package.json'
import postcss from 'rollup-plugin-postcss'
import path from 'path'

export default {
	input: 'src/index.tsx',
	output: [
		{
			file: packageJson.main,
			format: 'cjs',
			sourcemap: true
		},
		{
			file: packageJson.module,
			format: 'esm',
			sourcemap: true
		}
	],
	plugins: [
		cleaner({
			targets: ['./lib']
		}),
		postcss({
			extract: path.resolve('lib/css/onboarding.css')
		}),
		peerDepsExternal(),
		resolve(),
		commonjs(),
		typescript({
			exclude: ['**/*.test.tsx']
		})
	]
}
