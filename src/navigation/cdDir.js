import { stat } from 'fs/promises';
import path from 'path';
import { STATUS_OK, STATUS_ERROR } from '../helpers/constants.js';

export const moveToCdDir = async (currDir, pathToDir) => {
  const newPath = path.join(currDir, pathToDir);

  try {
    const stats = await stat(pathToDir);
    if (stats.isDirectory()) {
      return {
        status: STATUS_OK,
        path: pathToDir,
      };
    }
  } catch {}

  try {
    const stats = await stat(newPath);
    if (stats.isDirectory()) {
      return {
        status: STATUS_OK,
        path: newPath,
      };
    }
  } catch {}

  return { status: STATUS_ERROR };
};