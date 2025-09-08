import IArticle, { IFlexibleArticleFields } from "../utils/interfaces/article.interface";
import IAdmin from "../utils/interfaces/admin.interface";
import * as admModel from '../models/adm.model';
import { getArticles as gerGetArticles } from "../models/guess.model";
import { isValidUser, isValidEmail } from '../utils/main.util';

// export async function signup(admData: IAdmin) {
//   const { user, email, password } = admData;

//   if (!user && !email) throw new Error('You must set an user or an email');
//   if (user && (!isValidUser(user))) throw new Error('Invalid user');
//   if (email && (!isValidEmail(email))) throw new Error('Invalid email');

//   const hashedPassword = await bcrypt.hash(password, 9);

//   const { token } = admModel.signup({ user, email, hashedPassword });
// }

export async function signin(admData: IAdmin) {
  if (!admData) throw new Error('No data found');

  const { user, email, password } = admData;

  if (!user && !email) throw new Error('You must set an user or an email');
  if (user && (!isValidUser(user))) throw new Error('Invalid user');
  if (email && (!isValidEmail(email))) throw new Error('Invalid email');

  const { token } = await admModel.signin({ user, email, password });

  return { token };
}

export async function getArticles(): Promise<{ articles: IArticle[] | IArticle }> {
  const { articles } = await gerGetArticles();

  return { articles };
}

export async function updateArticleData(id: number, data: IFlexibleArticleFields): Promise<{ article: IArticle | null }> {
  if ((!id) || isNaN(id)) throw new Error('Invalid User ID');

  const { article } = await admModel.updateArticleData(id, { title: data.title, body: data.body });
  
  if (!article) throw new Error('There is no article to update');

  return { article };
}

export async function createArticle(data: IFlexibleArticleFields): Promise<{ article: IArticle }> {
  const { article } = await admModel.createArticle(data);

  return { article };
}

export async function deleteArticle(id: number): Promise<{ article: IArticle }> {
  if ((!id) || isNaN(id)) throw new Error('Invalid User ID');

  const { article } = await admModel.deleteArticle(id);
  
  if (!article) throw new Error('There is no article to delete');

  return { article };
}