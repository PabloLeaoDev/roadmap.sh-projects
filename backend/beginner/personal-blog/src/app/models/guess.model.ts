import prisma from '../database/PrismaClient.ts';
import IPostTable from '../utils/interfaces/post.interface.ts';

export async function getPosts(id?: number): Promise<{ posts: IPostTable[] | IPostTable }> {
  let posts: IPostTable[];

  if (id) posts = await prisma.post.findMany({ where: { id } });
  else posts = await prisma.post.findMany();

  if (!posts)
    throw new Error('No posts in database');

  return { posts };
}
