import {doSlugifyFilename, constructOutput} from './utils.js';

const options = [
	{
		prefix: 'Standard',
		titleCase: false,
		lowerCase: false,
		upperCase: false,
		strict: false,
	},
	{
		prefix: 'Standard Title Case',
		titleCase: true,
	},
	{
		prefix: 'Standard Lower Case',
		lowerCase: true,
	},
	{
		prefix: 'Standard Upper Case',
		upperCase: true,
	},
	{
		prefix: 'Strict',
		strict: true,
	},
	{
		prefix: 'Strict Title Case',
		titleCase: true,
		strict: true,
	},
	{
		prefix: 'Strict Lower Case',
		strict: true,
	},
	{
		prefix: 'Strict Upper Case',
		upperCase: true,
		strict: true,
	},
];

export function processFilename(input) {
	return options.map(options =>
		constructOutput(
			options.prefix,
			doSlugifyFilename(input, options)
				.map(element => element.filename)
				?.join('\n'),
		),
	);
}
