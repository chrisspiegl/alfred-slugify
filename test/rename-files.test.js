import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { existsSync, mkdtempSync, renameSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { test } from 'node:test' // eslint-disable-line test/no-import-node-test -- node --test is the runner
import { applySlugifyRenames, RENAME_APPLIED_STATUS, RENAME_SKIPPED_STATUS } from '../src/utils.js'

function withTempDirectory(run) {
  const directory = mkdtempSync(path.join(tmpdir(), 'alfred-slugify-'))
  try {
    return run(directory)
  }
  finally {
    rmSync(directory, { recursive: true, force: true })
  }
}

test('every skipped path reports skipped and leaves the files in place', () => {
  withTempDirectory((directory) => {
    const source = path.join(directory, 'Already There.txt')
    const destination = path.join(directory, 'already-there.txt')
    const missing = path.join(directory, 'missing.txt')
    writeFileSync(source, 'keep')
    writeFileSync(destination, 'dest')

    let renameCalls = 0
    const result = applySlugifyRenames([
      { old: source, new: destination },
      { old: missing, new: path.join(directory, 'missing-slug.txt') },
    ], {
      fileExists: existsSync,
      renameFile(oldPath, newPath) {
        renameCalls += 1
        renameSync(oldPath, newPath)
      },
    })

    assert.equal(result.status, RENAME_SKIPPED_STATUS)
    assert.equal(result.renamed.length, 0)
    assert.equal(result.skipped.length, 2)
    assert.equal(renameCalls, 0)
    assert.equal(existsSync(source), true)
    assert.equal(existsSync(destination), true)
  })
})

test('a completed rename reports renamed', () => {
  withTempDirectory((directory) => {
    const source = path.join(directory, 'My File.txt')
    const destination = path.join(directory, 'my-file.txt')
    writeFileSync(source, 'move')

    const result = applySlugifyRenames([
      { old: source, new: destination },
    ], {
      fileExists: existsSync,
      renameFile: renameSync,
    })

    assert.equal(result.status, RENAME_APPLIED_STATUS)
    assert.equal(result.renamed.length, 1)
    assert.equal(existsSync(source), false)
    assert.equal(existsSync(destination), true)
  })
})

test('one renamed file still reports renamed when another path is skipped', () => {
  withTempDirectory((directory) => {
    const source = path.join(directory, 'Notes.txt')
    const destination = path.join(directory, 'notes.txt')
    writeFileSync(source, 'move')

    const result = applySlugifyRenames([
      { old: source, new: destination },
      { old: path.join(directory, 'absent.txt'), new: path.join(directory, 'absent-slug.txt') },
    ], {
      fileExists: existsSync,
      renameFile: renameSync,
    })

    assert.equal(result.status, RENAME_APPLIED_STATUS)
    assert.equal(result.renamed.length, 1)
    assert.equal(result.skipped.length, 1)
    assert.equal(existsSync(destination), true)
  })
})

test('the rename script prints renamed only when a file changes', () => {
  withTempDirectory((directory) => {
    const source = path.join(directory, 'My Report.txt')
    const destination = path.join(directory, 'my-report.txt')
    const blockedSource = path.join(directory, 'Taken.txt')
    const blockedDestination = path.join(directory, 'taken.txt')
    writeFileSync(source, 'move')
    writeFileSync(blockedSource, 'keep')
    writeFileSync(blockedDestination, 'dest')

    const skipped = spawnSync(process.execPath, ['src/rename.js', JSON.stringify({
      input: [blockedSource],
      lowerCase: true,
    })], { encoding: 'utf8' })
    assert.equal(skipped.status, 0)
    assert.equal(skipped.stdout, '')
    assert.equal(existsSync(blockedSource), true)

    const renamed = spawnSync(process.execPath, ['src/rename.js', JSON.stringify({
      input: [source],
      lowerCase: true,
    })], { encoding: 'utf8' })
    assert.equal(renamed.status, 0)
    assert.equal(renamed.stdout, RENAME_APPLIED_STATUS)
    assert.equal(existsSync(source), false)
    assert.equal(existsSync(destination), true)
  })
})
