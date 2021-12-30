# alfred-slugify

> [Alfred](https://alfredapp.com) workflow to slugify clipboard content, selected text, and filenames

<img src="media/screenshot.png" style="width: 100%;">

Slugify your clipboard content, things you enter into Alfred itself, selected text via the UniversalActions as well as Filenames of selected files!

## Install

```bash
npm install --global alfred-slugify
```

*Requires [Node.js](https://nodejs.org) 14+ and the Alfred [Powerpack](https://alfredapp.com/powerpack/).*

## Usage

*Careful: using slugify on files is not reversible!*

If you want to test if you like the result of the slugify process, duplicate your files before running this workflow!

* You can use `slugify` as a keyword in the standard Alfred window to slugify the clipboard content or enter something to slugify
* You can use `slugify` on selected text to slugify the selection
* Hitting <kbd>Enter</kbd> in Alfred will copy the selected slug to your clipboard
* When holding <kbd>Command</kbd> while hitting <kbd>Enter</kbd> on the result, the slugified text will be copied to your clipboard and also pasted to the front most app
* You can use `slugify` on selected files and folders
  * `slugify !rename` will actually rename the files
  * `slugify !filename` will process the filename and leave the extension intact
* You can use filters to get a specific `slugify` style
  * You can use things like `!strict` or `!standard upper` or `!stan title` as filters at the end of your input.
  * When you want to slugify the clipboard content, don't enter anything other than `slugify` or `slugify !title` and you will get the filtered list only containing title case.

## Related

* [More Alfred Workflows](https://github.com/chrisspiegl/alfred-workflows) - My Alfred Workflow Directory
* [alfy](https://github.com/sindresorhus/alfy) - Create Alfred workflows with ease
* [slugify](https://github.com/sindresorhus/slugify) - NPM Library to slugify text
