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
      console.log(list);
      break;
    
    default:
      process.stdout.write(INVALID_INPUT);
      break;
  }
});

process.on('SIGINT', exitUser);