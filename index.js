import { exitUser, printName } from './src/helpers/welcome.js';
import readLine from 'readline';

printName(process.argv);

const rl = readLine.createInterface({ input: process.stdin });
rl.on('line', (data) => {
  const [command, ...args] = data.split(' ');
  switch (command) {
    case '.exit':
      exitUser();
      break;

    default:
      console.log(args);
      break;
  }
});

process.on('SIGINT', exitUser);