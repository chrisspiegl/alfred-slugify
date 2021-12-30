import cp from 'node:child_process';
import path from 'node:path';
import {discoverPathSync} from 'discover-path';
import slugify from '@sindresorhus/slugify';
import {titleCase} from 'title-case';

export function constructOutput(prefix, slug) {
	return {
		title: `${prefix}: ${slug}`,
		subtitle: 'Copy to Clipboard',
		arg: slug,
		text: {
			copy: slug,
			largetype: slug,
		},
		match: prefix,
		mods: {
			cmd: {
				subtitle: 'Paste to front most app & copy to clipboard',
				variables: {
					action: 'paste',
				},
			},
		},
	};
}

export function constructOutputRename(prefix, slug, options) {
	return {
		variables: {
			action: 'rename',
		},
		title: `Rename with ${prefix}: ${slug}`,
		subtitle: 'CAUTION: This can not be undone!',
		match: prefix,
		arg: JSON.stringify(options),
	};
}

export function getClipboardContent() {
	return cp.spawnSync('pbpaste', {
		encoding: 'utf8',
	}).stdout;
}

export function isFileAction(input) {
	const lines = input.split('\n').filter(element => element.trim() !== '');
	const filePathLines = lines
		.map(line => {
			if (input.slice(0, 1) !== '/') {
				return false;
			}

			return fileExistsWithCaseSync(line.trim());
		})
		.filter(element => element);
	return filePathLines.length > 0;
}

export function findFilter(input) {
	const regexFilter = /!(?<filter>[a-zA-Z ]*)$/;
	const regexMatches = input.trim().match(regexFilter);
	const foundFilter = regexMatches?.groups.filter;
	const inputWithoutFilter = input.trim().replace(regexFilter, '');
	return {
		inputWithoutFilter,
		foundFilter,
	};
}

export function findCommand(input) {
	const regexCommand = /^!(?<command>[a-zA-Z]*)/;
	const regexMatches = input.trim().match(regexCommand);
	const foundCommand = regexMatches?.groups.command;
	const inputWithoutCommand = input.trim().replace(regexCommand, '');
	return {
		inputWithoutCommand,
		foundCommand,
	};
}

export function doSlugify(input, options) {
	const lines = input.split('\n');
	input = lines.length > 0 ? lines : [input];
	return input.map(line => slugifyLine(line.trim(), options)).join('\n');
}

export function doSlugifyFilename(input, options) {
	return input.split('\n').map(line => {
		line = line.trim();
		const {name} = path.parse(line); //=> "hello"
		const {ext} = path.parse(line); //=> ".html"
		const dir = path.dirname(line);
		const slug = slugifyLine(name, options);
		const filename = slug + ext;
		return {
			old: line,
			new: path.resolve(dir, filename),
			filename,
		};
	});
}

export function slugifyLine(output, options) {
	if (options.titleCase) {
		output = titleCase(output);
	}

	output = slugify(output, {lowercase: false});

	if (options.upperCase) {
		output = output.toUpperCase();
	} else if (options.lowerCase) {
		output = output.toLowerCase();
	}

	return output;
}

export function fileExistsWithCaseSync(filepath) {
	try {
		return Boolean(discoverPathSync(filepath.trim()));
	} catch {
		return false;
	}
}
