import path from 'path';

export const moveUpDir = (currDir) => {
  return path.dirname(currDir);
};