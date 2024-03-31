import { exec } from 'child_process';

async function composeDown() {
  return new Promise((resolve, reject) => {
    exec('npm run docker:down', (error, stdout, stderr) => {
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

module.exports = async function afterAll(_globalConfig: any, _projectConfig: any) {
  console.log('Jest teardown...');
  await composeDown();
};
