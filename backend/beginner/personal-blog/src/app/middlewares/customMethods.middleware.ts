import { Request, Response, NextFunction } from 'express';
import { mainViewData } from '../utils/main.util.ts';

export default function customMethods(req: Request, res: Response, next: NextFunction): void {
  res.renderLayout = (options, callback) => {
    res.render('layouts/index', options, callback);
  }

  next();  
}
