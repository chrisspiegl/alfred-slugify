import {doSlugifyFilename, constructOutput} from './utils.js';

const options = [
	{
		prefix: 'Standard',
		titleCase: false,
		lowerCase: false,
		upperCase: false,
	},
	{
		prefix: 'Title Case',
		titleCase: true,
	},
	{
		prefix: 'Lower Case',
		lowerCase: true,
	},
	{
		prefix: 'Upper Case',
		upperCase: true,
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
