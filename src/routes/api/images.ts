import express from "express";
import sharp from "sharp";
import {promises as fs} from 'fs';

const images = express.Router();

let width : number;
let height : number;
let filename : string;

const resizeImage = (filename: string, width: number, height : number) : string => {
    const new_filename = "assets/thumb/" + filename + "_thumb.jpg";
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

images.get('/', (req, res) => {
    // res.send("image connected");
    filename = req.query.filename as string;
    width = Number(req.query.width);
    height = Number(req.query.height);
    
    if (Number.isNaN(width) || Number.isNaN(height)) {
        res.send("invalid arguments given");
    } else {
        const new_filename = resizeImage(filename, width, height);
        const new_src = `https://localhost:3000/api/images?filename=${filename}&width=${width}&height=${height}`
        console.log("new src name: " + new_src);
        res.render('index', {
            backgroundImage: new_filename, 
            src: new_src
        });
    }

    
});

export { images, resizeImage };
