const { Chromeless } = require('chromeless')
const fs = require('fs')
const sharp = require('sharp')
const scale = () => {
  return sharp().resize(400, 300)
}

async function run() {
  const chromeless = new Chromeless()
  const screenshot = await chromeless.setViewport({ width: 2560, height: 1440, scale: 1 }).goto('http://fr.orson.io').screenshot()
  let readStream = fs.createReadStream(screenshot)
  let writeStream = fs.createWriteStream('screenshot.png')
  writeStream.on('close', () => {
    chromeless.end()
  })
  writeStream.on('error', error => {
    console.error(error)
    chromeless.end()
  })
  readStream.pipe(scale()).pipe(writeStream)
}
run().catch(console.error)
