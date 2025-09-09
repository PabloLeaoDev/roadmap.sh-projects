import bcrypt from 'bcrypt';
import 'dotenv/config';

export async function createHashedPassword(password: string, salt: string | number): Promise<string> {
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
}

// (async () => console.log(await createHashedPassword('12345678', 9)))();