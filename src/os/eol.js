import os from 'os';

export const getEOL = () => {
  console.log(JSON.stringify(os.EOL));
};