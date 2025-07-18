import express from 'express';
import cors from 'cors';
import Routes from './routes'
import { Request, Response, NextFunction } from 'express';

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('public'));
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ erro: 'Erro interno do servidor' });
});
app.use('/', Routes);
