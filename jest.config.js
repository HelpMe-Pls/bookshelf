const fs = require('fs')
const path = require('path')
const resolve = require('resolve')

process.env.BABEL_ENV = 'test'
process.env.NODE_ENV = 'test'
process.env.PUBLIC_URL = ''

require('react-scripts/config/env')

module.exports = {
	roots: ['<rootDir>/src'],
	preset: 'ts-jest',
	testMatch: ['**/__tests__/**/*.ts'],
	testEnvironment: resolve.sync('jest-environment-jsdom', {
		basedir: require.resolve('jest'),
	}),

	setupFiles: [require.resolve('whatwg-fetch')],
	// some of the exercise branches don't have setupTests.js
	setupFilesAfterEnv: fs.existsSync('src/setupTests.js')
		? ['<rootDir>/src/setupTests.js']
		: [],
	moduleDirectories: ['node_modules', path.join(__dirname, './src')],
	transform: {
		'^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': require.resolve(
			'react-scripts/config/jest/babelTransform',
		),
		'^.+\\.css$': require.resolve(
			'react-scripts/config/jest/cssTransform.js',
		),
		'^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)': require.resolve(
			'react-scripts/config/jest/fileTransform.js',
		),
	},
	transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
	resetMocks: true,
	collectCoverageFrom: [
		'src/**/*.js',
		'!<rootDir>/node_modules/**/*',
		'!<rootDir>/src/test/**/*',
		'!<rootDir>/src/setupProxy*',
		'!<rootDir>/src/setupTests*',
		'!<rootDir>/src/dev-tools/**/*',
	],
	watchPlugins: [
		'jest-watch-typeahead/filename',
		'jest-watch-typeahead/testname',
	],
}
