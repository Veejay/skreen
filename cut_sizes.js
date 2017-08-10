const fs = require('fs')
const sharp = require('sharp')
const pathname = require('path')

const SIZES = [
  { width: 1280, height: 800 },
  { width: 960, height: 600 },
  { width: 640, height: 400 },
  { width: 480, height: 300 },
  { width: 320, height: 200 },
  { width: 240, height: 150 }
]

const scale = ({ pipeline, path, width, height }) => {
  return new Promise((resolve, reject) => {
    const resizedPath = `resized-${width}-${height}-${pathname.basename(path)}`
    let writeStream = fs.createWriteStream(resizedPath)
    writeStream.on('close', () => {
      resolve(resizedPath)
    })
    writeStream.on('error', error => {
      reject(error)
    })
    pipeline.clone().resize(width, height).pipe(writeStream)
  })
}

function list(path) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, {encoding: 'utf-8'}, (error, paths) => {
      if(error) {
        reject(error)
      } else {
        resolve(paths)
      }
    })
  })
}

function cut(path) {
  const basename = pathname.basename(path, '.png')
  let pipeline = sharp(path)
  let promises = SIZES.map(size => {
    let params = Object.assign({ pipeline, path: path }, size)
    return scale(params)
  })
  return Promise.all(promises)
}

list('./samples').then(paths => {
  Promise.all(paths.map(path => {
    return cut(`./samples/${path}`)
  })).then(done => {
  }).catch(console.error)
}).catch(console.error)
