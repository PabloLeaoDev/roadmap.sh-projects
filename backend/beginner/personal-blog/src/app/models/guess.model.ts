import prisma from '../database/PrismaClient.ts';
import { Post  } from '../../generated/prisma/client.ts';

export async function getPosts(id?: number): Promise<{ posts: Post[] }> {
  let posts: Post[];

  if (id)
    posts = await prisma.post.findMany({ where: { id } });
  else
    posts = await prisma.post.findMany();

  return { posts };
}
