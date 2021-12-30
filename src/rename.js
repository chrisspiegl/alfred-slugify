import {renameSync} from 'node:fs';
import alfy from 'alfy';
import {doSlugifyFilename, fileExistsWithCaseSync} from './utils.js';

const inputArgs = JSON.parse(alfy.input);
const slugifiedFilenames = doSlugifyFilename(inputArgs.input, inputArgs);

for (const file of slugifiedFilenames) {
	if (fileExistsWithCaseSync(file.old) && !fileExistsWithCaseSync(file.new)) {
		renameSync(file.old, file.new, {overwrite: true});
	}
}
