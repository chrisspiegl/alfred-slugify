import alfy from 'alfy';
import {
	findFilter,
	findCommand,
	isFileActionCaseSensitive,
	getClipboardContent,
} from './src/utils.js';
import {processCopyPaste} from './src/process-copy-paste.js';
import {processFilename} from './src/process-filename.js';
import {processRename} from './src/process-rename.js';

const {inputWithoutFilter, foundFilter: filter} = findFilter(alfy.input);
const {inputWithoutCommand, foundCommand} = findCommand(inputWithoutFilter);
const input = (inputWithoutCommand || getClipboardContent())
	.replaceAll('\t', '\n')
	.split('\n')
	.map(element => element.trim());

function process(input) {
	if (foundCommand === 'rename') {
		return processRename(input);
	}

	if (foundCommand === 'filename') {
		return processFilename(input);
	}

	if (isFileActionCaseSensitive(input)) {
		return [
			{
				title: 'Rename file with Slugify',
				valid: false,
				autocomplete: `!rename ${input}`,
			},
			{
				title: 'Slugify File Name',
				valid: false,
				autocomplete: `!filename ${input}`,
			},
		];
	}

	return processCopyPaste(input);
}

function filterOutput(filter, output) {
	const filterSplit = filter.split(' ');
	for (const filter of filterSplit) {
		output = alfy.matches(filter, output, 'match');
	}

	return output;
}

const output = process(input);
alfy.output(filter ? filterOutput(filter, output) : output);
