const fs = require('mz/fs')
const fetch = require('node-fetch')
const path = require('path')

module.exports = async function dlPhoto (url, name) {
  let file = fs.createWriteStream(name)
  return fetch(url, { mode: 'no-cors' })
    .then(response => {
      response.blob(file)
    })
    .then(data => fs.writeFile(path.join(`img/${name}`), data))
    .then(console.log)

  //   let result
  //   const browser = await puppeteer.launch()
  //   return browser
  //     .newPage()
  //     .then(page => page.goto(url))
  //     .then(page => page.buffer())
  //     .then(data => {
  //       result = fs.writeFile(path.join(`img/${name}`), data)
  //     })
  //     .then(() => browser.close())
  //     .then(e => result)
}
