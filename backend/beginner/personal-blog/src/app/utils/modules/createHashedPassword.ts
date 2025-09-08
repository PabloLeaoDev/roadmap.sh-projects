import bcrypt from 'bcrypt';

export async function createHashedPassword(password: string): Promise<string> {
  const hashedPassword = await bcrypt.hash(password, (process.env.SALT as string | number));

  return hashedPassword;
}
