import {constructOutput, doSlugify} from './utils.js';

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

export function processCopyPaste(input) {
	return options.map(element =>
		constructOutput(element.prefix, doSlugify(input, element)),
	);
}
