import express from "express";
import sharp from "sharp";
import {promises as fs} from 'fs';

// create the images route
const images = express.Router();

// declare variables needed
let width : number;
let height : number;
let filename : string | null;

// function for resizeing the image
const resizeImage = async (filename: string, width: number, height : number) : Promise<string> => {
    const new_filename = "./assets/thumb/" + filename + "_thumb.jpg";
    const old_filename = "assets/full/" + filename + ".jpg";
    sharp(old_filename).resize(width, height).toFile(new_filename, function(err) {
        // res.setHeader('Content-Type', 'image/jpg');
        // res.setHeader('Content-Length', width * height); // Image size here
        // res.setHeader('Access-Control-Allow-Origin', '*'); // If needs to be public
    });
    console.log("changed " + old_filename 
        + " to " + new_filename 
        + " with w = " + width 
        + " and h = " + height);
    return new_filename;
}

images.get('/', async (req, res) => {
    // res.send("image connected");
    filename = req.query.filename as string | null;
    width = Number(req.query.width);
    height = Number(req.query.height);
    
    if (Number.isNaN(width) || Number.isNaN(height) || filename == null) {
        res.send("invalid arguments given");
    } else {
        const new_filename = await resizeImage(filename, width, height);
        const new_src = `http://localhost:3000/${new_filename.substring(8)}`;
        console.log("new src name: " + new_src);
        res.render('index', {
            src: new_src
        });
    }

    
});

export { images, resizeImage };
