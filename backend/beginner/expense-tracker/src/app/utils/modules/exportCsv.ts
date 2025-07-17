import { promises as fs, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const __exportPath: string = resolve(__dirname, '..', '..', '..', '..', 'exports');

function removeCommas(data: string[] | string[][]): string[] | string[][] {
  for (let index in data) {
    if (typeof data[index] === 'string')
      data[index] = data[index]
                      .split('')
                      .filter((char) => char !== ',')
                      .join('');
    else if (data[index] && (typeof data[index] !== 'string')) 
      removeCommas(data[index]);
  }

  return data;
}

function csvStringfy(csvBody: string[][], csvHeaders?: string[]): string {
  let result = '';

  if (csvHeaders) {
    csvHeaders = (removeCommas(csvHeaders) as string[]);
    result += `${csvHeaders.join(',')}\n`;
  }

  csvBody = (removeCommas(csvBody) as string[][]);

  for (let row of csvBody) 
    result += `${row.join(',')}\n`; 
  
  return result;
}

export default async function exportCsvFile(fileName: string, csvBody: string[][], csvHeaders?: string[]) {
  if (!existsSync(__exportPath)) await fs.mkdir(__exportPath);
  const output = csvStringfy(csvBody, csvHeaders);

  await fs.writeFile(resolve(__exportPath, `${fileName}.csv`), output);
  console.log('CSV file created successfully!');
}