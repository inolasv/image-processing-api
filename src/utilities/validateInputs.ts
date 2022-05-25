import { promises as fs } from 'fs';

// function for validating the inputs
const validateInput = async (
    filename: string | null,
    width: number,
    height: number
): Promise<boolean> => {
    // check filename is not null
    if (filename == null) {
        return false;
    }
    // check if file exists
    const old_filename = 'assets/full/' + filename + '.jpg';
    try {
        await fs.access(old_filename);
    } catch (error) {
        return false;
    }

    // check width is positive integer
    if (Number.isNaN(width) || width < 0 || !Number.isInteger(width)) {
        return false;
    }
    // check height is positive integer
    if (Number.isNaN(height) || height < 0 || !Number.isInteger(width)) {
        return false;
    }
    // everything is good, return true
    return true;
};

export default validateInput;
