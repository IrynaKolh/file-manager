import * as path from 'path';
import { createReadStream } from 'fs';
import { OPERATION_FAILED } from '../helpers/constants.js';

export const readFile = async (currDir, pathToFile) => {
    const fileToRead = path.join(currDir, pathToFile);
   
    const readableStream = createReadStream(fileToRead);
    readableStream.on('error', () => process.stdout.write(OPERATION_FAILED));
    readableStream.pipe(process.stdout);
    process.stdout.write('\n');
};
