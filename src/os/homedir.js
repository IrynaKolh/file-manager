import os from 'os';

export const getHomedir = () => {
  console.log(os.homedir());
};