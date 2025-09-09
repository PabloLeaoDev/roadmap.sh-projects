import { promises as fs, existsSync, readFile } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import IArticle, { IFlexibleArticleFields } from '../utils/interfaces/article.interface';
import IAdmin from '../utils/interfaces/admin.interface';
import { createDataBase, getCurrentDateFormat } from '../utils/main.util';
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken';

const __filename = fileURLToPath(import.meta.url), __dirname = dirname(__filename);
const dbPathAdmin = resolve(__dirname, '..', '..', '..', 'db', 'admin.json');
export const dbPathArticles = resolve(__dirname, '..', '..', '..', 'db', 'articles.json');

// export async function compareWithVerifiedAdm(admData: IAdmin): Promise<{ error: boolean, message: string }> {
//   const validAdmin = { user: 'test', email: 'test@hardcoded.com', password: 'isHardCodeAGoodPractice123' };

//   if ((!admData.user) || (!admData.email) || (!admData.password)) throw new Error();

//   await createDataBase(JSON.stringify([ validAdmin ]), dbPathAdmin);

//   for (let [ key ] of Object.entries(validAdmin))
//     if (admData[key as TAdminKeys] !== validAdmin[key as TAdminKeys]) throw new Error();

//   return {
//     error: false,
//     message: ''
//   };
// }

export async function signin(admData: IAdmin) {
  const { user, email, password } = JSON.parse(await fs.readFile(dbPathAdmin, 'utf-8'))[0];

  if (admData.user && admData.email) {
    if ((admData.user !== user) || (admData.email !== email)) throw new Error('Wrong User or Email');
  } else if (admData.user) {
    if (admData.user !== user) throw new Error('Wrong User');
  } else if (admData.email) {
    if (admData.email !== email) throw new Error('Wrong Email');
  } else throw new Error();

  const isPasswordValid = await bcrypt.compare(admData.password, password);
  
  if (!isPasswordValid) throw new Error('Invalid credentials');

  const token = jwt.sign({ userId: admData.id }, (process.env.JWT_SECRET as string), { expiresIn: '1h' });

  return { token };
}

export async function updateArticleData(id: number, fields: IFlexibleArticleFields): Promise<{ article: IArticle | null }> {
  if (!id) throw new Error('ID article must be submitted');
  if ((!fields.title) && (!fields.body)) throw new Error('At least one article upgradeable field must be submitted');

  console.log(dbPathArticles);

  const articles: IArticle[] = JSON.parse(await fs.readFile(dbPathArticles, 'utf-8'));
  let article: IArticle | null = null;

  for (let atc of articles) {
    if (atc.id === id) {
      if (fields.title) atc.title = fields.title;
      if (fields.body) atc.body = fields.body;

      atc.updated_at = getCurrentDateFormat();
    }
  }

  await createDataBase(JSON.stringify(articles), dbPathArticles);

  return { article };
}

export async function createArticle(fields: IFlexibleArticleFields): Promise<{ article: IArticle }> {
  if ((!fields.title) || (!fields.body)) throw new Error('Both fields of the article must be submitted');

  if (!existsSync(dbPathArticles))
    await createDataBase('[]', dbPathArticles);

  const articles: IArticle[] = JSON.parse(await fs.readFile(dbPathArticles, 'utf-8'));
  const id = (() => {
    if (!articles.length) return 1;
      
    return articles[articles.length - 1].id + 1;
  })();

  const newArticle = { id, title: fields.title, body: fields.body, created_at: getCurrentDateFormat(), updated_at: getCurrentDateFormat() };

  articles.push(newArticle);

  await createDataBase(JSON.stringify(articles), dbPathArticles);

  return { article: newArticle };
}

export async function deleteArticle(id: number): Promise<{ article: IArticle | null }> {
  if (!id) throw new Error('ID article must be submitted');

  const articles: IArticle[] = JSON.parse(await fs.readFile(dbPathArticles, 'utf-8'));
  let article: IArticle | null = null;

  for (let idx in articles) {
    if (articles[idx].id === id)
      articles.splice(Number(idx), 1);
  }

  await createDataBase(JSON.stringify(articles), dbPathArticles);

  return { article };
}