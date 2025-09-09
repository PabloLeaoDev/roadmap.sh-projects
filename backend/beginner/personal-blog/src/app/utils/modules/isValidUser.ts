import isAlphabetic from './isAlphabetic';

export default function isValidUser(user: string): boolean {
  if (!user || (typeof user !== 'string')) return false;
  if ((user.length < 3) || (user.length > 12)) return false;

  let userAbcChars = 0;

  for (let char of user) {
    if (isAlphabetic(char)) {
      userAbcChars++;
      continue;
    }
  }

  if (userAbcChars < 1) return false;

  return true;
}
