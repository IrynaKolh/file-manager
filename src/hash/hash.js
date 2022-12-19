import crypto from 'crypto';
import fs from 'fs/promises';
import { createReadStream } from 'fs';
import path from 'path';

export const calculateHash = async (currDir, fileName) => {
  const filePath = path.resolve(currDir, fileName);  
  const readableStream = createReadStream(filePath);
  const hash = crypto.createHash('sha256');
  hash.setEncoding('hex');

  readableStream.on('end', function() {
    hash.end();
    console.log(hash.read());
  })
  readableStream.pipe(hash);
};