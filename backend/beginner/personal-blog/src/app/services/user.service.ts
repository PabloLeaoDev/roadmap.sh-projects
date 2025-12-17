import IPostTable, { IPost } from '../utils/interfaces/post.interface.ts';
import IUser from '../utils/interfaces/admin.interface.ts';
import * as userModel from '../models/user.model.ts';
import { getPosts as gerGetPosts } from '../models/guess.model.ts';
import { isValidUser, isValidEmail } from '../utils/main.util.ts';
import bcrypt from 'bcrypt';

export async function signup(userData: IUser) {
  const { user, email, password } = userData;

  if (!user && !email) throw new Error('You must set an user or an email');
  if (user && (!isValidUser(user))) throw new Error('Invalid user');
  if (email && (!isValidEmail(email))) throw new Error('Invalid email');

  const { token } = await userModel.signup({ user, email, password });

  return { token };
}

export async function signin(userData: IUser) {
  if (!userData) throw new Error('No data found');

  const { user, email, password } = userData;

  if (!user && !email) throw new Error('You must set an user or an email');
  if (user && (!isValidUser(user))) throw new Error('Invalid user');
  if (email && (!isValidEmail(email))) throw new Error('Invalid email');

  const { token } = await userModel.signin({ user, email, password });

  return { token };
}

export async function getPosts(): Promise<{ posts: IPostTable[] | IPostTable }> {
  const { posts } = await gerGetPosts();

  return { posts };
}

export async function updatePostData(id: number, data: IPost): Promise<{ post: IPostTable | null }> {
  if ((!id) || isNaN(id)) throw new Error('Invalid User ID');

  const { post } = await userModel.updatePostData(id, { title: data.title, authorId: data.authorId, content: data.content, summary: data.summary, category: data.category, tags: data.tags });
  
  if (!post) throw new Error('There is no post to update');

  return { post };
}

export async function createPost(data: IPost): Promise<{ post: IPostTable }> {
  const { post } = await userModel.createPost(data);

  return { post };
}

export async function deletePost(id: number): Promise<{ post: IPostTable }> {
  if ((!id) || isNaN(id)) throw new Error('Invalid User ID');

  const { post } = await userModel.deletePost(id);
  
  if (!post) throw new Error('There is no post to delete');

  return { post };
}