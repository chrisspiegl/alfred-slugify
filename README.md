# alfred-slugify

> [Alfred](https://alfredapp.com) workflow to slugify clipboard content, selected text, and filenames

Slugify clipboard content, text entered into Alfred, selected text via Universal Actions, and filenames of selected files and folders.

Requires Alfred 5 with the [Powerpack](https://alfredapp.com/powerpack/) and [Node.js](https://nodejs.org) 20+ (verified on 24).

## Install

```bash
npm install --global alfred-slugify
```

## Usage

*Careful: using slugify on files is not reversible.*

If you want to test if you like the result of the slugify process, duplicate your files before running this workflow!

* You can use `slugify` as a keyword in the standard Alfred window to slugify the clipboard content or enter something to slugify
* You can use `slugify` on selected text to slugify the selection
* Hitting <kbd>Enter</kbd> in Alfred will copy the selected slug to your clipboard
* When holding <kbd>Command</kbd> while hitting <kbd>Enter</kbd> on the result, the slugified text will be copied to your clipboard and also pasted to the front most app
* You can use `slugify` on selected files and folders
  * `slugify !rename` will actually rename the files
  * `slugify !filename` will process the filename and leave the extension intact
* You can use filters to get a specific `slugify` style
  * You can use things like `!title` or `!upper` or `!case title` as filters at the end of your input.
  * When you want to slugify the clipboard content, don't enter anything other than `slugify` or `slugify !title` and you will get the filtered list only containing title case.

Selecting several files autocompletes `!rename` and `!filename` with the paths separated by tabs. The rename success notification is shown only when at least one file was renamed.

## Development

```bash
pnpm install
pnpm lint
pnpm test
pnpm release
```

## Release

From a clean `main` checkout, `pnpm release` prompts for the version, publishes to npm with pnpm, and creates the GitHub release. Requires npm login and a GitHub token (`GITHUB_TOKEN`) or `gh` auth.

## Related

* [More Alfred Workflows](https://github.com/chrisspiegl/alfred-workflows) - My Alfred Workflow Directory
* [alfy](https://github.com/sindresorhus/alfy) - Create Alfred workflows with ease
* [slugify](https://github.com/sindresorhus/slugify) - NPM Library to slugify text
