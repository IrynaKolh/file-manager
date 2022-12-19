import { createWriteStream } from 'fs';
import path from 'path';
import { OPERATION_FAILED } from '../helpers/constants.js';

export const addFile = (currDir, fileName) => {
  const filePath = path.join(currDir, fileName);
  const writableStream = createWriteStream(filePath, { flags: 'ax' });
  writableStream.on('error', () =>
    process.stdout.write(`${OPERATION_FAILED}File already exists: ${filePath} \n`)
  );
  writableStream.end();
};