import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import Routes from './routes.ts'
import { Request, Response, NextFunction } from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import customMethods from './middlewares/customMethods.middleware.ts';

const __filename = fileURLToPath(import.meta.url), 
      __dirname = dirname(__filename);
const app = express();

app.locals.styles = ['index', 'home'];
app.locals.scripts = ['htmx.min', 'hyperscript.min'];

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('public'));
app.use(customMethods);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.use((req: Request, res: Response, next: NextFunction) => {
  res.locals.layout = true; 

  if (req.headers['hx-request'])
    res.locals.layout = false; 

  next();
});

app.use(Routes);

export default app;