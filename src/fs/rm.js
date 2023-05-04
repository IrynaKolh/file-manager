import { rm } from 'fs/promises';
import path from 'path';
import { OPERATION_FAILED } from '../helpers/constants.js';

export const removeFile = async (currentDir, fileName) => {
  const currentFile = path.resolve(currentDir, fileName);

  try {
    await rm(currentFile);    
  } catch {
    process.stdout.write(OPERATION_FAILED);
  }
};