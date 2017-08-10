const { Chromeless } = require('chromeless')
const fs = require('fs')
const sharp = require('sharp')

const SIZES= [
  { width: 1280, height: 800 },
  { width: 960, height: 600 },
  { width: 640, height: 400 },
  { width: 480, height: 300 },
  { width: 320, height: 200 },
  { width: 240, height: 150 }
]
const scale = (pipeline, width, height) => {
  return new Promise((resolve, reject) => {
    const path = `resized-${width}-${height}.png`
    let writeStream = fs.createWriteStream(path)
    writeStream.on('close', () => {
      resolve(path)
    })
    writeStream.on('error', error => {
      reject(error)
    })
    pipeline.clone().resize(width, height).pipe(writeStream)
  })
}

async function run() {
  const chromeless = new Chromeless()
  const screenshot = await chromeless.setViewport({ width: 2560, height: 1440, scale: 1 }).goto('http://www.corse-le-gr20.com/13/gr-20-sud').screenshot()
  let pipeline = sharp(screenshot)
  let promises = SIZES.map(size => {
    return scale(pipeline, size.width, size.height)
  })
  let results = await Promise.all(promises)
  return results
}

run().then(console.log).catch(console.error)
