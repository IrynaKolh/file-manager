import { readdir } from 'fs/promises';

export const getList = async (currentDir) => {
  const files = await readdir(currentDir, { withFileTypes: true });
  const fileNames = files.filter(isFileOrDirectoryBoolean)
        .map(isFileOrDirectory)
        .sort(sortDirectoriesAndFiles);
  return fileNames;
};

const isFileOrDirectoryBoolean = (file) => {
  return file.isDirectory() || file.isFile();
}

const isFileOrDirectory = (file) => {
  return {
      name: file.name,
      type: file.isDirectory() ? 'directory' : 'file',
  }
}

const sortDirectoriesAndFiles = (a, b) => {
  if (a.type === b.type) {
      return a.name.localeCompare(b.name);
  }

  return a.type === 'directory' ? -1 : 1;
}