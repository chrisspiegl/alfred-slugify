import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test' // eslint-disable-line test/no-import-node-test -- node --test is the runner
import { RENAME_APPLIED_STATUS } from '../src/utils.js'

const plist = readFileSync(new URL('../info.plist', import.meta.url), 'utf8')
const packageJson = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'))

const renameScriptUid = '910B18BA-B114-4274-8324-C365EEBFC2D0'
const renameNotificationUid = '96D583BD-F244-4660-BD07-8F6BEF4ED277'
const renameGateUid = 'C4E8A1B2-7D3F-4E91-8A6C-2F5B9D0E1A47'

test('clipboard notifications spell Copied', () => {
  assert.equal(plist.includes('Copyied'), false)
  assert.equal(plist.includes('Copied to Clipboard &amp; Pasted to Frontmost App'), true)
  assert.equal(plist.includes('<string>Copied to Clipboard</string>'), true)
})

test('rename success notification runs only after a renamed status', () => {
  const connections = plist.slice(plist.indexOf('<key>connections</key>'), plist.indexOf('<key>createdby</key>'))
  const scriptKey = `<key>${renameScriptUid}</key>`
  const scriptConnection = connections.slice(
    connections.indexOf(scriptKey),
    connections.indexOf(`<key>${renameGateUid}</key>`),
  )

  assert.equal(scriptConnection.includes(renameNotificationUid), false)
  assert.equal(scriptConnection.includes(renameGateUid), true)
  assert.equal(plist.includes(`<string>${RENAME_APPLIED_STATUS}</string>`), true)
  assert.match(plist, new RegExp(`<key>${renameGateUid}</key>[\\s\\S]*?<string>${renameNotificationUid}</string>`))
})

test('plist describes this workflow and matches package metadata', () => {
  assert.equal(plist.includes('Alfred Alfred'), false)
  assert.match(plist, /<key>description<\/key>\s*<string>Alfred workflow to slugify clipboard content, selected text, and filenames<\/string>/)
  assert.match(plist, new RegExp(`<key>version</key>\\s*<string>${packageJson.version}</string>`))
  assert.match(plist, /<key>webaddress<\/key>\s*<string>https:\/\/github.com\/chrisspiegl\/alfred-slugify<\/string>/)
  assert.match(plist, /Slugify clipboard content, text typed into Alfred, selected text, and filenames/)
})
