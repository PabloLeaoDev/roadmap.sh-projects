export default function isAlphabetic(text: string): boolean {
  if (typeof text !== 'string') return false;

  const accentedLettersCodes = [
    0x00c0, // À
    0x00c1, // Á
    0x00c2, // Â
    0x00c3, // Ã
    0x00c8, // È
    0x00c9, // É
    0x00ca, // Ê
    0x00cc, // Ì
    0x00cd, // Í
    0x00d2, // Ò
    0x00d3, // Ó
    0x00d4, // Ô
    0x00d5, // Õ
    0x00d9, // Ù
    0x00da, // Ú
  ];

  const accentedLetters = accentedLettersCodes.map((code) =>
      String.fromCharCode(code)
    ),
    alphabet = Array.from({ length: 26 }, (_, i) =>
      String.fromCharCode(65 + i)
    ),
    combAlpha = alphabet.concat(accentedLetters).concat(' '),
    getChars = text
      .split('')
      .map((char) => char.toUpperCase())
      .map((char) => (combAlpha.includes(char) ? char : ''));

  return !getChars.includes('');
}
