import { constructOutputRename, doSlugifyFilename } from './utils.js'

const options = [
  {
    prefix: 'Standard',
    titleCase: false,
    lowerCase: false,
    upperCase: false,
  },
  {
    prefix: 'Title Case',
    titleCase: true,
  },
  {
    prefix: 'Lower Case',
    lowerCase: true,
  },
  {
    prefix: 'Upper Case',
    upperCase: true,
  },
]

export function processRename(input) {
  return options.map((options) => {
    // console.log('process rename')
    const slugified = doSlugifyFilename(input, { input, ...options })
    // console.log('slugified', slugified)
    return constructOutputRename(options.prefix, slugified.map(element => element.filename).join('\n'), {
      input,
      ...options,
    })
  })
}
