import { exec } from 'child_process';

export const execAsync = async (command: string) => {
  return new Promise((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      if (err) {
        return reject(err);
      }
      console.log('stderr', stderr);
      return resolve(stdout);
    });
  });
};
