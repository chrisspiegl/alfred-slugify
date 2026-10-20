import alfy from 'alfy'
import { processCopyPaste } from './src/process-copy-paste.js'
import { processFilename } from './src/process-filename.js'
import { processRename } from './src/process-rename.js'
import {
  fileActionAutocomplete,
  findCommand,
  findFilter,
  getClipboardContent,
  isFileActionCaseSensitive,
  splitWorkflowInput,
} from './src/utils.js'

const { inputWithoutFilter, foundFilter: filter } = findFilter(alfy.input)
const { inputWithoutCommand, foundCommand } = findCommand(inputWithoutFilter)
const input = splitWorkflowInput(inputWithoutCommand || getClipboardContent())

function run(input) {
  if (foundCommand === 'rename') {
    return processRename(input)
  }

  if (foundCommand === 'filename') {
    return processFilename(input)
  }

  if (isFileActionCaseSensitive(input)) {
    return [
      {
        title: 'Rename file with Slugify',
        valid: false,
        autocomplete: fileActionAutocomplete('rename', input),
      },
      {
        title: 'Slugify File Name',
        valid: false,
        autocomplete: fileActionAutocomplete('filename', input),
      },
    ]
  }

  return processCopyPaste(input)
}

function filterOutput(filter, output) {
  const filterSplit = filter.split(' ')
  for (const filter of filterSplit) {
    output = alfy.matches(filter, output, 'match')
  }

  return output
}

const output = run(input)
alfy.output(filter ? filterOutput(filter, output) : output)
