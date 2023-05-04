import { stat } from 'fs/promises';
import path from 'path';
import { createWriteStream, createReadStream } from 'fs';
import { OPERATION_FAILED } from '../helpers/constants.js';


export const copyFile = async (currDir, fileName, newDir) => {
   
    const file = path.join(currDir, fileName);
    const destinationWay = path.resolve(currDir, newDir);
    const newFile = path.join(destinationWay, fileName);  
        
    try {
      const isFileExsist = await stat(file);
      const isFolderExsist = await  stat(destinationWay);

      if (!isFileExsist.isFile() || !isFolderExsist.isDirectory) {
        process.stdout.write(OPERATION_FAILED);
        return false;
      }
  
      const writableStream = createWriteStream(newFile, { flags: 'ax' });
  
      writableStream.on('error', () => {
        process.stdout.write(
          `${OPERATION_FAILED}File already exists: ${newFile} \n`
        );
        return false;
      });
  
      const readableStream = createReadStream(file);
      readableStream.pipe(writableStream);     
    } catch {
      process.stdout.write(OPERATION_FAILED);
      return false;
    }
  
    return true;

};