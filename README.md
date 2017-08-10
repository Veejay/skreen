# Skreen

## Dependencies

- sharp (https://github.com/lovell/sharp)
- chromeless (https://github.com/graphcool/chromeless)

## Intended uses

Meant to replace a phantomjs-based solution that is complicated to maintain. This is way less code and way more modern and efficient.

## Using it

If you're here, you know what it's about. Clone, yarn/npm install and run node index.js after having tweaked parameters.

## Performance

I did a test on **145 PNG images**, resizing them all in one go takes `23s`, an average of `1/6th of a second` per file.
This is of cours a ballpark estimate with a larger number of files resized at the same time and should only give a rough estimate of the running time per file.

## TODO

- [ ] Transform into Express application 
- [x] ~~See if more sizes can be cut concurrently~~
- [x] ~~See if more screenshots can be taken concurrently~~
- [ ] Deploy to GAE
