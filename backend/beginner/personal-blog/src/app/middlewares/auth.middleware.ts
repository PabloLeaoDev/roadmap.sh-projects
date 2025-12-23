import 'dotenv/config';   
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function verifyAuthMid(req: Request, res: Response, next: NextFunction): 
  Response<any, Record<string, any>> | void 
{
  const authHeader = req.headers['authorization'],
        token = authHeader && authHeader.split(' ')[1];
      
  if (!token) 
    return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, (process.env.JWT_SECRET as string));
    req.user = decoded;
    
    next();
  } catch (error) {
    res.sendStatus(401);
  }
}
