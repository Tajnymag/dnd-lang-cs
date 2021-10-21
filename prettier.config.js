module.exports = {
	useTabs: true,
	singleQuote: true,
	tabWidth: 4,
	overrides: [
		{
			files: '*.vue',
			options: {
				singleQuote: false,
			},
		},
	],
};
