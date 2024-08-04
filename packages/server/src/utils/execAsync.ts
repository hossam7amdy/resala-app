import { exec } from 'child_process';
import { promisify } from 'util';

export const execAsync = async (command: string) => {
  const execPromise = promisify(exec);

  return execPromise(command);
};
