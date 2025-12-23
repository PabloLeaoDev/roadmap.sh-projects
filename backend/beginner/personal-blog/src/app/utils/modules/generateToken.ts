import 'dotenv/config';
import jwt, { SignOptions } from 'jsonwebtoken';

export default function generateToken(user: { id: number, user?: string, email?: string }): string {
  const secret = process.env.JWT_SECRET;

  if (!secret) throw new Error('Not configured JWT_SECRET.');

  const options: SignOptions = {
    expiresIn: (process.env.JWT_EXPIRES as any) || '1h'
  };

  return jwt.sign(
      { id: user.id, user: user.user, email: user.email },
      secret,
      options
    );
}