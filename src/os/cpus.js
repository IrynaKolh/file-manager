import os from 'os';
import { GHZ_IN_MHZ } from '../helpers/constants.js';

export const getCPUs = () => {
  console.table(
    os.cpus().map((cpu) => {
      return {
        model: cpu.model,
        speed: `${cpu.speed / GHZ_IN_MHZ} GHz`,
      };
    })
  );
};