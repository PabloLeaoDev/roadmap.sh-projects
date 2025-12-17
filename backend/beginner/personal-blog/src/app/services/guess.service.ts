import * as guessModel from '../models/guess.model.ts';
import { Post  } from '../../generated/prisma/client.ts';

export async function getPosts(id?: number): Promise<{ posts: Post[] | Post }> {
  if (id && isNaN(id)) throw new Error('Invalid User ID');

  const { posts } = (id) ? await guessModel.getPosts(id) : await guessModel.getPosts();

  return { posts };
}