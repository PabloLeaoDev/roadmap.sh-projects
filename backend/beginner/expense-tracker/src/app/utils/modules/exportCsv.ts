import fs from 'fs';

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

export default async function exportCsvFile(path: string, csvBody: string[][], csvHeaders?: string[]) {
  const output = csvStringfy(csvBody, csvHeaders);

  fs.writeFile(path, output, (err) => {
    if (err) throw err;
    console.log('CSV file created successfully!');
  });
}