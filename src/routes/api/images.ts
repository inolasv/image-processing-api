import express from 'express';
import resizeImage from '../../utilities/resizeImage';
import validateInput from '../../utilities/validateInputs';

// create the images route
const images = express.Router();

// declare variables needed
let width: number;
let height: number;
let filename: string | null;

// function to display the image
const displayImage = async (
    res: express.Response,
    filename: string
): Promise<void> => {
    try {
        const new_filename = await resizeImage(filename, width, height);
        const new_src = `http://localhost:3000/${new_filename.substring(8)}`;
        // console.log('new src name: ' + new_src);
        res.render('images', {
            src: new_src,
        });
    } catch (error) {
        res.send('Invalid file given');
    }
};

// routes to the file and handles the queries
images.get('/', async (req, res) => {
    // res.send("image connected");
    filename = req.query.filename as string | null;
    width = Number(req.query.width);
    height = Number(req.query.height);

    // validate inputs
    const valid = await validateInput(filename, width, height);
    if (valid) {
        displayImage(res, filename as string);
    } else {
        res.send('Invalid Input Given');
    }
});

export { images, resizeImage };
