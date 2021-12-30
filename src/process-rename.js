import {constructOutputRename, doSlugifyFilename} from './utils.js';

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
	},
	{
		prefix: 'Strict Lower Case',
		lowerCase: true,
	},
	{
		prefix: 'Strict Upper Case',
		upperCase: true,
		strict: true,
	},
];

export function processRename(input) {
	return options.map(options => {
		const slugified = doSlugifyFilename(input, {input, ...options});
		return constructOutputRename(options.prefix, slugified.map(element => element.filename).join('\n'), {
			input,
			...options,
		});
	});
}
