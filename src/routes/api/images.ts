import express from 'express';
import resizeImage from '../../utilities/resizeImage';
import validateInput from '../../utilities/validateInputs';

// create the images route
const images = express.Router();

// function to display the image
const displayImage = async (
    res: express.Response,
    filename: string,
    width: number,
    height: number
): Promise<void> => {
    const new_filename = await resizeImage(filename, width, height);
    const new_src = `http://localhost:3000/${new_filename.substring(8)}`;
    // console.log('new src name: ' + new_src);
    res.render('images', {
        src: new_src,
    });
};

// routes to the file and handles the queries
images.get(
    '/',
    async (req: express.Request, res: express.Response): Promise<void> => {
        // res.send("image connected");
        const filename: string | null = req.query.filename as string | null;
        const width: number = Number(req.query.width);
        const height: number = Number(req.query.height);

        // validate inputs
        const valid = await validateInput(filename, width, height);
        if (valid == null) {
            displayImage(res, filename as string, width, height);
        } else {
            res.send(valid);
        }
    }
);

export { images, resizeImage };
