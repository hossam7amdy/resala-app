import { exec } from 'child_process';

async function composeUp() {
  return new Promise((resolve, reject) => {
    exec('npm run docker:up', (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        reject(error);
      }
      console.log(stdout);
      console.log(stderr);
      resolve(true);
    });
  });
}

async function migrate() {
  return new Promise((resolve, reject) => {
    exec('dotenv -e .env.test -- npx prisma migrate dev', (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        reject(error);
      }
      console.log(stdout);
      console.log(stderr);
      resolve(true);
    });
  });
}

async function sleep(seconds: number) {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000);
  });
}

module.exports = async function beforeAll(_globalConfig: any, _projectConfig: any) {
  console.log('Jest setup...');
  await composeUp();

  // recursive call to retry migration till it's successful
  let migrationSuccess = false;
  while (!migrationSuccess) {
    try {
      console.log('Migrating...');
      await migrate();
      migrationSuccess = true;
    } catch (error) {
      console.error('Migration failed, retrying in 3 seconds...');
      await sleep(3);
    }
  }
};
