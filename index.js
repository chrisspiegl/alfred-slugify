import alfy from 'alfy';
import {findFilter, findCommand, isFileAction, getClipboardContent} from './src/utils.js';
import {processCopyPaste} from './src/process-copy-paste.js';
import {processFilename} from './src/process-filename.js';
import {processRename} from './src/process-rename.js';

const {inputWithoutFilter, foundFilter: filter} = findFilter(alfy.input);
const {inputWithoutCommand, foundCommand} = findCommand(inputWithoutFilter);
let input = inputWithoutCommand || getClipboardContent();

// Force File Action input to be with new lines instead of tabs!
// NOTE: this may be problematic if content contains tabs.
input = input.replace('\t', '\n');

function process(input) {
	if (foundCommand === 'rename') {
		return processRename(input);
	}

	if (foundCommand === 'filename') {
		return processFilename(input);
	}

	if (isFileAction(input)) {
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

function fi(filter, output) {
  const filterSplit = filter.split(' ')
  for (const filter of filterSplit) {
    output = alfy.matches(filter, output, 'match');
  }
  return output
}

const output = process(input);
alfy.output(filter ? fi(filter, output) : output);
