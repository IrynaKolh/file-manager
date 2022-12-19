import { access, rename as promiseRename } from 'fs/promises';
import { OPERATION_FAILED } from '../helpers/constants.js';
import path from 'path';

export const renameFile = async (currDir, oldName, newName) => {
  const currFile = path.join(currDir, oldName);
  const newFile = path.join(currDir, newName);

  let isFileExist;

  try {
    await access(newFile);
    isFileExist = true;
  } catch {
    isFileExist = false;
  }

  if (isFileExist) {
    process.stdout.write(
      `${OPERATION_FAILED} ${newFile} already exists \n`
    );
    return;
  }

  try {
    await promiseRename(currFile, newFile);  
  } catch (error) {
    process.stdout.write(OPERATION_FAILED);
  }
};