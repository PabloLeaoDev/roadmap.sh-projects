import isAlphabetic from "./isAlphabetic";

export default function isValidEmail(email: string): boolean {
  if (!email || (typeof email !== 'string')) return false;

  const emailArr = email.split('@');

  if (emailArr.length <= 1) return false;
  if (!email[1].includes('.')) return false;

  const emailUserPart = {
    abcChars: 0,
    numChars: 0,
    spcChars: 0
  } 

  if (!isAlphabetic(email[0][0])) return false;

  for (let char of email[0]) {
    if (Number(char)) {
      emailUserPart.numChars++;
      continue;
    }

    if (isAlphabetic(char)) {
      emailUserPart.abcChars++;
      continue;
    }

    emailUserPart.spcChars++;
  }

  if (emailUserPart.abcChars < 1) return false;
  if ((emailUserPart.numChars === 0) && (emailUserPart.spcChars === 0)) return false;

  return true;
}
