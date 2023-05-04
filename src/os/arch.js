import os from 'os';

export const getArch = () => {
  console.log(os.arch());
};