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
1. start or build the server
2. ensure that the file being resized is of .jpg
3. in order to resize image, go to the link: http://localhost:3000/api/images?filename={filename}&width={width}&height={height} Where filename is the name of the image file *without* the added .jpg, width is the disred width and height is the desired height
4. Refresh the page and the image should appear on the screen as well as the assets/thumbs folder.