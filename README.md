# image-processing-api

## Start Application:
`npm run start`

## Build Application:
`npm run build`

## Test Application:
`npm run test`
(this runs both build and jasmine)

## Endpoints:
Main endpoint starts on: http://localhost:3000/api
Images endpoint on: http://localhost:3000/api/images

## Use the API:
1. start/build the server
2. ensure that the file being resized is a .jpg
3. in order to resize image, go to the link: http://localhost:3000/api/images?filename={filename}&width={width}&height={height} where filename is the name of the image file *without* the added .jpg
    * width is the desired width and height is the desired height
4. the image should be in the assets/thumbs folder. refresh the page and the image should appear

### Resurces:
* stackoverflow (for error message debugging)
* https://eslint.org/
* https://prettier.io/
* https://nodejs.org/api/fs.html#file-system
