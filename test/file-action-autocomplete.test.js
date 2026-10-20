import assert from 'node:assert/strict'
import { test } from 'node:test' // eslint-disable-line test/no-import-node-test -- node --test is the runner
import { fileActionAutocomplete, findCommand, splitWorkflowInput } from '../src/utils.js'

test('file action autocomplete joins multiple paths with tabs', () => {
  const paths = ['/tmp/My File.png', '/tmp/second.jpg']
  const autocomplete = fileActionAutocomplete('rename', paths)

  assert.equal(autocomplete, `!rename ${paths.join('\t')}`)
  assert.notEqual(autocomplete, `!rename ${paths}`)

  const { foundCommand, inputWithoutCommand } = findCommand(autocomplete)
  assert.equal(foundCommand, 'rename')
  assert.deepEqual(splitWorkflowInput(inputWithoutCommand), paths)
})

test('filename autocomplete uses the same tab splitter', () => {
  const paths = ['/tmp/a.txt', '/tmp/b.txt', '/tmp/c.txt']
  const autocomplete = fileActionAutocomplete('filename', paths)
  const { foundCommand, inputWithoutCommand } = findCommand(autocomplete)

  assert.equal(foundCommand, 'filename')
  assert.deepEqual(splitWorkflowInput(inputWithoutCommand), paths)
})

test('a single path still autocompletes as one argument', () => {
  assert.equal(fileActionAutocomplete('rename', ['/tmp/a.png']), '!rename /tmp/a.png')
})

test('the workflow splitter does not recover comma-joined paths', () => {
  const paths = ['/tmp/a.png', '/tmp/b.png']
  const { inputWithoutCommand } = findCommand(`!rename ${paths}`)

  assert.deepEqual(splitWorkflowInput(inputWithoutCommand), ['/tmp/a.png,/tmp/b.png'])
})
