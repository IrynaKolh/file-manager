import { exitUser, printName, printCurrDir } from './src/helpers/messengers.js';
import readLine from 'readline';
import os from 'os';
import {  
  INVALID_INPUT,
  OPERATION_FAILED,
  STATUS_OK,
  STATUS_ERROR 
} from './src/helpers/constants.js';
import { moveUpDir } from './src/navigation/upDir.js';
import { moveToCdDir } from './src/navigation/cdDir.js';
import { getList } from './src/navigation/list.js';
import { readFile } from './src/fs/cat.js';
import { addFile } from './src/fs/add.js';
import { renameFile } from './src/fs/rn.js';
import { copyFile } from './src/fs/copy.js';
import { removeFile } from './src/fs/rm.js';

printName(process.argv);

let currDir = os.homedir();
printCurrDir(currDir);

const rl = readLine.createInterface({ input: process.stdin });
rl.on('line', async (data) => {
  const [command, ...args] = data.split(' ');
  switch (command) {
    case '.exit':
      exitUser();
      break;

    case 'up':
      currDir = moveUpDir(currDir);
      printCurrDir(currDir);
      break;

    case 'cd':
      const [newPath] = args;
      if (newPath === '..') {
        currDir = moveUpDir(currDir);
        printCurrDir(currDir);
        break;
      }
      const cdObj = await moveToCdDir(currDir, newPath);
      if (cdObj.status === STATUS_OK) {
        currDir = cdObj.path;
        printCurrDir(currDir);
      } else {
        process.stdout.write(OPERATION_FAILED);
      }
      break;

    case 'ls':
      const list = await getList(currDir);
      console.table(list);
      printCurrDir(currDir);
      break;

    case 'cat':
      const [pathToFile] = args;
      readFile(currDir, pathToFile);
      printCurrDir(currDir);
      break;
  
    case 'add':
      const [fileName] = args;
      addFile(currDir, fileName);
      console.log('File is created.')
      printCurrDir(currDir);
      break;

    case 'rn':
      const [oldFile, newFile] = args;
      renameFile(currDir, oldFile, newFile);
      console.log('FileName is changed');
      printCurrDir(currDir);
      break;

    case 'cp':
      const [file, folder] = args;
      copyFile(currDir, file, folder);
      console.log('File is copied.')
      printCurrDir(currDir);
      break;
  
    case 'rm':
      const [fileRemove] = args;
      removeFile(currDir, fileRemove);
      console.log('File is deleted.');
      printCurrDir(currDir);
      break;

    case 'mv':
      const [sourseToFile, pathToNewDirectory] = args;
      copyFile(currDir, sourseToFile, pathToNewDirectory);
      removeFile(currDir, sourseToFile);
      console.log('File is moved.')
      printCurrDir(currDir);
      break;  

    default:
      process.stdout.write(INVALID_INPUT);
      break;
  }
});

process.on('SIGINT', exitUser);