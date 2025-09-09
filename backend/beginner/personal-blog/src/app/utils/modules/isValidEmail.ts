import isAlphabetic from './isAlphabetic';

export default function isValidEmail(email: string): boolean {
  if (!email || (typeof email !== 'string')) return false;
  
  const emailArr = email.split('@');
  
  if ((emailArr[0].length < 3) || (emailArr[0].length > 12)) return false;
  if (!emailArr[1].includes('.')) return false;
  if (!isAlphabetic(emailArr[0][0])) return false;

  for (let char of emailArr[0]) {
    if (Number(char)) continue;
    if (isAlphabetic(char)) continue;
    if (char !== '.') return false;
  }

  return true;
}

isValidEmail('admin@email.com')