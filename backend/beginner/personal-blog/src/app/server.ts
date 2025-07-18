import 'dotenv/config';
import { app } from './app';

app.listen(process.env.PORT, () => {
  console.log(`Server is running: http://localhost:${process.env.PORT}/`);
});
