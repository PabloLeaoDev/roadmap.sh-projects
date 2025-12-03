import * as guessModel from '../models/guess.model.ts';
import { IPost } from '../utils/interfaces/post.interface.ts';

export async function getPosts(id?: number): Promise<{ posts: IPost[] | IPost }> {
  if (id && isNaN(id)) throw new Error('Invalid User ID');

  const { posts } = (id) ? await guessModel.getPosts(id) : await guessModel.getPosts();

  return { posts };
}