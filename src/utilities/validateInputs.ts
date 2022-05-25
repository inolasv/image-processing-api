import { promises as fs } from 'fs';

// function for validating the inputs
const validateInput = async (
    filename: string | null,
    width: number,
    height: number
): Promise<string | null> => {
    // check filename is not null
    if (filename == null) {
        return 'Error: filename is empty';
    }
    // check if file exists
    const old_filename = 'assets/full/' + filename + '.jpg';
    try {
        await fs.access(old_filename);
    } catch (error) {
        return 'Error: image does not exist';
    }

    // check width is positive integer
    if (Number.isNaN(width)) {
        return 'Error: width is empty OR not a valid number';
    } else if (width < 0 || !Number.isInteger(width)) {
        return 'Error: width is not a positive integer';
    }
    // check height is positive integer
    if (Number.isNaN(height)) {
        return 'Error: height is empty OR not a valid number';
    } else if (height < 0 || !Number.isInteger(height)) {
        return 'Error: height is not a positive integer';
    }
    // everything is good, return true
    return null;
};

export default validateInput;
