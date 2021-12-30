import {constructOutput, doSlugify} from './utils.js';

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
		lowerCase: true,
		strict: true,
	},
	{
		prefix: 'Strict Upper Case',
		titleCase: false,
		strict: true,
		lowerCase: false,
		upperCase: true,
	},
];

export function processCopyPaste(input) {
	return options.map(element =>
		constructOutput(element.prefix, doSlugify(input, element)),
	);
}
