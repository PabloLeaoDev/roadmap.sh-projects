import IPostTable, { IPost } from '../utils/interfaces/post.interface.ts';
import IUser from '../utils/interfaces/admin.interface.ts';
import * as userModel from '../models/user.model.ts';
import { getArticles as gerGetPosts } from '../models/guess.model.ts';
import { isValidUser, isValidEmail } from '../utils/main.util.ts';

// export async function signup(userData: IAdmin) {
//   const { user, email, password } = userData;

//   if (!user && !email) throw new Error('You must set an user or an email');
//   if (user && (!isValidUser(user))) throw new Error('Invalid user');
//   if (email && (!isValidEmail(email))) throw new Error('Invalid email');

//   const hashedPassword = await bcrypt.hash(password, 9);

//   const { token } = admModel.signup({ user, email, hashedPassword });
// }

export async function signin(userData: IUser) {
  if (!userData) throw new Error('No data found');

  const { user, email, password } = userData;

  if (!user && !email) throw new Error('You must set an user or an email');
  if (user && (!isValidUser(user))) throw new Error('Invalid user');
  if (email && (!isValidEmail(email))) throw new Error('Invalid email');

  const { token } = await userModel.signin({ user, email, password });

  return { token };
}

export async function getPosts(): Promise<{ articles: IPostTable[] | IPostTable }> {
  const { articles } = await gerGetPosts();

  return { articles };
}

export async function updateArticleData(id: number, data: IPost): Promise<{ article: IPostTable | null }> {
  if ((!id) || isNaN(id)) throw new Error('Invalid User ID');

  const { article } = await userModel.updatePostData(id, { title: data.title, author: data.author, content: data.content, summary: data.summary, category: data.category, tags: data.tags });
  
  if (!article) throw new Error('There is no article to update');

  return { article };
}

export async function createPost(data: IPost): Promise<{ article: IPostTable }> {
  const { article } = await userModel.createPost(data);

  return { article };
}

export async function deletePost(id: number): Promise<{ article: IPostTable }> {
  if ((!id) || isNaN(id)) throw new Error('Invalid User ID');

  const { article } = await userModel.deletePost(id);
  
  if (!article) throw new Error('There is no article to delete');

  return { article };
}