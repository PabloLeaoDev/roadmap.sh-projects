import jwt from 'jsonwebtoken';

export default function generateToken(usr: { id: number, user?: string, email?: string }): string {
    return jwt.sign(
        { id: usr.id, user: usr.user, email: usr.email },
        (process.env.JWT_SECRET as string),
        { expiresIn: '1d' }
      );
}