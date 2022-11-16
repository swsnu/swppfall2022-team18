module.exports = {
	env: {
		browser: true,
		es2021: true,
		jest: true,
	},
	extends: [
		"plugin:react/recommended",
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
	],
	overrides: [],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
		tsconfigRootDir: __dirname,
		project: ["./tsconfig.json"],
	},
	settings: {
		react: {
			version: "detect",
		},
	},
	plugins: ["react", "@typescript-eslint"],
	rules: {
		"@typescript-eslint/no-var-requires": 0,
	},
	ignorePatterns: [".eslintrc.js"],
};
