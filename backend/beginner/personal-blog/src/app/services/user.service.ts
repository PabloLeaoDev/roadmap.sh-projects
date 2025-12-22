import { IPost, IPostCreate, IPostNoDate } from '../utils/interfaces/post.interface.ts';
import { IUser, IUserBase, IUserCreate, IUserUpdate } from '../utils/interfaces/user.interface.ts';
import * as userModel from '../models/user.model.ts';
import { getPosts as gerGetPosts } from '../models/guess.model.ts';

export async function signup(userData: IUserCreate) {
  const { user, email, password, permId } = userData;

  const { login, token } = await userModel.signup(
    { user, email, password, permId }
  );

  return { login, token };
}

export async function signin(userData: IUserBase) {
  const { user, email, password, permId } = userData;

  const { token } = await userModel.signin(
    { user, email, password, permId }
  );

  return { token };
}

export async function getPosts(): Promise<{ posts: IPost[] | IPost }> {
  const { posts } = await gerGetPosts();

  return { posts };
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