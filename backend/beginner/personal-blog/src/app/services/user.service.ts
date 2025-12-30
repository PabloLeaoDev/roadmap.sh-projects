import * as userModel from '../models/user.model.ts';
import { IPost, IPostCreate, IPostNoDate } from '../utils/interfaces/post.interface.ts';
import { IUser, IUserBase, IUserCreate } from '../utils/interfaces/user.interface.ts';
import { getPosts as gerGetPosts } from '../models/guess.model.ts';
import bcrypt from 'bcrypt'; 

export async function signup(userData: IUserCreate) {
  const hashedPassword = await bcrypt.hash(userData.password, 9);

  const { id, name, email } = await userModel.signup({ ...userData, password: hashedPassword });

  return { id, name, email };
}

export async function signin(userData: IUserBase) {
  const { user } = await userModel.signin(userData);

  if (!user)
    throw new Error('User not found');

  const { id, name, email, password } = user;

  const isPasswordValid = await bcrypt.compare(userData.password, password);
  
  if (!isPasswordValid)
    throw new Error('Invalid credentials');

  return { id, name, email };
}

export async function getPosts() {
  const { posts } = await gerGetPosts();

  const authorIds = [ ...new Set(posts.map((post) => post.authorId)) ];

  const { users } = await getUsersById(authorIds);

  const authorsNames = Object.fromEntries(users.map((user) => [ user.id, user.name ]));

  const postsWithAuthor = posts.map((post) => {
    return {
      ...post,
      author: authorsNames[post.authorId]
    };
  });

  return { posts: postsWithAuthor };
}

export async function getUsersById(ids: number[] | number): Promise<{ users: IUser[] }> {
  if (!Array.isArray(ids)) 
    ids = [ ids ];

  if (ids.some((id) => isNaN(id))) throw new Error('Invalid User ID');

  const { users } = await userModel.getUsersById(ids);

  if (!users)
    throw new Error('This user does not exist');

  return { users };
}

export async function updatePostData(data: IPostNoDate): Promise<{ post: IPost | null }> {
  const { post } = await userModel.updatePostData({
    id: data.id,
    title: data.title,
    authorId: data.authorId,
    content: data.content,
    summary: data.summary,
    category: data.category,
    tags: data.tags
  });
  
  if (!post) throw new Error('There is no post to update');

  return { post };
}

export async function createPost(data: IPostCreate): Promise<{ post: IPostCreate }> {
  const { post } = await userModel.createPost(data);

  return { post };
}

export async function deletePost(id: number): Promise<{ post: IPost }> {
  const { post } = await userModel.deletePost(id);
  
  if (!post) throw new Error('There is no post to delete');

  return { post };
}