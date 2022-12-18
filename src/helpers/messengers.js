let userName = '';

export const printName = (args) => {
  userName = args[2].replace('--username=', '');
  process.stdout.write(`Welcome to the File Manager, ${userName}! \n`);
};

export const exitUser = () => {
  process.stdout.write(`\nThank you for using File Manager, ${userName}, goodbye! \n`);
  process.exit();
};

export const printCurrDir = (currDir) => {
  process.stdout.write(`\nYou are currently in ${currDir} \n`);
};