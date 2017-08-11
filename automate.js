const { Chromeless } = require('chromeless')
const fs = require('fs')
const sharp = require('sharp')
const scale = () => {
  return sharp().resize(400, 300)
}

async function run() {
  const chromeless = new Chromeless()
  const screenshot = await chromeless
    .setViewport({ width: 1280, height: 800, scale: 1 })
    .goto('https://secure.orson.io/fr/sessions/new')
    .type('quux@foo.bar', 'input#user_email')
    .type('somepassword', 'input#user_password')
    .click('div.callActionContainer input[type="submit"]')
    .wait('div.bgSection')
    .screenshot()
  await chromeless
    .wait(2000)
    .click('a[data-method="delete"]')
  console.log(screenshot)
  // let readStream = fs.createReadStream(screenshot)
  // let writeStream = fs.createWriteStream('screenshot.png')
  // writeStream.on('close', () => {
  //   chromeless.end()
  // })
  // writeStream.on('error', error => {
  //   console.error(error)
  //   chromeless.end()
  // })
  await chromeless.end()// readStream.pipe(scale()).pipe(writeStream)
}
run().catch(console.error)
