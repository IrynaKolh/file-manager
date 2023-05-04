import os from 'os';

export const getUserName = () => {
  console.log(os.userInfo().username);
};

