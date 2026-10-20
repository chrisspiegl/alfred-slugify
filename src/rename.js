import { renameSync } from 'node:fs'
import process from 'node:process'
import alfy from 'alfy'
import { applySlugifyRenames, doSlugifyFilename, fileExistsWithCaseSync, RENAME_APPLIED_STATUS } from './utils.js'

const inputArgs = JSON.parse(alfy.input)
const slugifiedFilenames = doSlugifyFilename(inputArgs.input, inputArgs)
const { status } = applySlugifyRenames(slugifiedFilenames, {
  fileExists: fileExistsWithCaseSync,
  renameFile: renameSync,
})

if (status === RENAME_APPLIED_STATUS) {
  process.stdout.write(RENAME_APPLIED_STATUS)
}

process.exit(0)
