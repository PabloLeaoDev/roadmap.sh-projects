import 'dotenv/config';   
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export default function auth(req: Request, res: Response, next: NextFunction): 
  Response<any, Record<string, any>> | void 
{
  try {  
    const { token } = req.cookies;
  
    if (!token) 
      throw new Error('Token not found.');

    const secret = process.env.JWT_SECRET;

    if (!secret)
      throw new Error('Not configured JWT_SECRET.');
  
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    
    next();
  } catch (error) {
    console.log(error);
    res.clearCookie('token');
    
    return res.redirect('/login');
  }
}
