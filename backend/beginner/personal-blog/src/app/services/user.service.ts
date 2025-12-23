import * as userModel from '../models/user.model.ts';
import { IPost, IPostCreate, IPostNoDate } from '../utils/interfaces/post.interface.ts';
import { IUserBase, IUserCreate } from '../utils/interfaces/user.interface.ts';
import { getPosts as gerGetPosts } from '../models/guess.model.ts';

export async function signup(userData: IUserCreate) {
  const { id, user, email } = await userModel.signup(userData);

  return { id, user, email };
}

export async function signin(userData: IUserBase) {
  const { id, user, email } = await userModel.signin(userData);

  return { id, user, email };
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