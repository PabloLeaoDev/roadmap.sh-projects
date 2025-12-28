import 'dotenv/config';
import { Response } from 'express';

export default function generateCookie(res: Response, token: string): void {
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'prod',
    sameSite: 'strict',
    maxAge: 60 * 60 * 1000 // 1h
  });
}