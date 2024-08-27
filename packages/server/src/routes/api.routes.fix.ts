import fs from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Specify the file path
const filePath = join(__dirname, 'api.routes.ts');

// Read the file content
fs.readFile(filePath, 'utf8', (err: any, data: string) => {
  if (err) {
    console.error('Error reading `api.routes.ts` file:', err);
    return;
  }

  // Regular expression to match ", multiple: false", ", multiple: true", ", "multiple": false", or ", "multiple": true"
  const regex = /,\s*["]?multiple["]?:\s*(false|true)/g;

  // Replace the matches with an empty string
  const updatedData = data.replace(regex, '');

  // Write the updated content back to the file
  fs.writeFile(filePath, updatedData, 'utf8', (err: any) => {
    if (err) {
      console.error('Error writing `api.routes.ts` file:', err);
      return;
    }
    console.log('`api.routes.ts` file updated successfully.');
  });
});
