import sharp from 'sharp';

// function for resizeing the image
const resizeImage = async (
    filename: string,
    width: number,
    height: number
): Promise<string> => {
    let new_filename:
        | string
        | null = `./assets/thumb/${filename}${width}x${height}_thumb.jpg`;
    const old_filename = 'assets/full/' + filename + '.jpg';
    sharp(old_filename)
        .resize(width, height)
        .toFile(new_filename, function (err) {
            if (err != null) {
                //console.log(err);
            }
        });

    // console.log(
    //     'changed ' +
    //         old_filename +
    //         ' to ' +
    //         new_filename +
    //         ' with w = ' +
    //         width +
    //         ' and h = ' +
    //         height
    // );

    return new_filename;
};

export default resizeImage;
