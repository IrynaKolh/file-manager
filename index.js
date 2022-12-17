import { exitUser, printName, printCurrentDir } from './src/helpers/messengers.js';
import readLine from 'readline';
import os from 'os';
import {INVALID_INPUT} from './src/helpers/constants.js'

printName(process.argv);

let currDir = os.homedir();
printCurrentDir(currDir);

const rl = readLine.createInterface({ input: process.stdin });
rl.on('line', (data) => {
  const [command, ...args] = data.split(' ');
  switch (command) {
    case '.exit':
      exitUser();
      break;

    default:
      process.write(INVALID_INPUT);
      break;
  }
});

process.on('SIGINT', exitUser);