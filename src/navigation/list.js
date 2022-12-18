import { readdir } from 'fs/promises';

export const getList = async (currentDir) => {
  const files = await readdir(currentDir, { withFileTypes: true });
  const fileNames = files.map((file) => file.name);
  return fileNames;
};