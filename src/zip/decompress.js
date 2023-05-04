import { createReadStream, createWriteStream } from 'fs';
import path from 'path';
import { createBrotliDecompress } from 'zlib';
import { pipeline } from 'stream/promises';
import { OPERATION_FAILED } from '../helpers/constants.js';

export const decompress = async (currDir, pathToFile, pathToDestination) => {
   try {
    const filePath = path.resolve(currDir, pathToFile);
    const archPath = path.resolve(currDir, pathToDestination);
  
    await pipeline(
      createReadStream(filePath),
      createBrotliDecompress(),
      createWriteStream(archPath, { flags: 'ax' })
    );
  } catch (error) {
    console.error(OPERATION_FAILED);
  }
};