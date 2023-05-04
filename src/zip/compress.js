import { createReadStream, createWriteStream } from 'fs';
import path from 'path';
import { createBrotliCompress } from 'zlib';
import { pipeline } from 'stream/promises';
import { OPERATION_FAILED } from '../helpers/constants.js';

export const compress = async (currDir, pathToFile, pathToDestination) => {
  try {
    const filePath = path.resolve(currDir, pathToFile);
    const archPath = path.resolve(currDir, pathToDestination);
  
    await pipeline(
      createReadStream(filePath),
      createBrotliCompress(),
      createWriteStream(archPath, { flags: 'ax' })
    );
  } catch (error) {
    console.error(OPERATION_FAILED);
  }
};
