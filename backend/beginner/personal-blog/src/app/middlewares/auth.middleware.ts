import 'dotenv/config';   
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function verifyAuthMid(req: Request, res: Response, next: NextFunction): 
  Response<any, Record<string, any>> | void 
{
  const { token } = req.cookies;
      
  if (!token) 
    return res.sendStatus(401);

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    console.error('Error: undefined JWT_SECRET env variable.');
    return res.sendStatus(500);
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    
    next();
  } catch (error) {
    res.sendStatus(401);
  }
}
