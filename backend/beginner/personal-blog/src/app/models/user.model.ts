import 'dotenv/config';
import prisma from '../database/PrismaClient.ts';
import { Permission } from '../utils/enums/perm.enum.ts';
import { IUser, IUserBase, IUserCreate } from '../utils/interfaces/user.interface.ts';
import { IPost, IPostCreate, IPostNoDate } from '../utils/interfaces/post.interface.ts';

export async function signup(userData: IUserCreate) {
  const user = await prisma.user.create({
    data: {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      posts: {},
      permId: Permission.ADMIN
    }
  });

  return { id: user.id, name: user.name, email: user.email };
}

export async function signin(userData: IUserBase) {
  let user: IUser | null = null;

  if (userData.name)
    user = await prisma.user.findFirst({ where: { name: userData.name } });
  else if (userData.email)
    user = await prisma.user.findFirst({ where: { email: userData.email } });

  return { user };
}

export async function getPosts(id?: number): Promise<{ posts: IPost[] | IPost }> {
  let posts: IPost[];

  if (id) posts = await prisma.post.findMany({ where: { id } });
  else posts = await prisma.post.findMany();

  if (!posts)
    throw new Error('No posts in database');

  return { posts };
}

export async function getUsersById(ids: number[] | number): Promise<{ users: IUser[] | null }> {
  const users = await prisma.user.findMany({
    where: {
      id: {
        in: Array.isArray(ids) ? ids : [ ids ]
      }
    }
  });

  return { users };
}

export async function updatePostData(data: IPostNoDate): Promise<{ post: IPost | null }> {
  const updatePost: IPost | null = await prisma.post.update({
    where: { id: data.id },
    data: {
      ...data,
      tags: data.tags ?? ''
    }
  });

  return { post: updatePost };
}

export async function createPost(fields: IPostCreate): Promise<{ post: IPostCreate }> {
  const newPost: IPost = await prisma.post.create({
    data: {
      ...fields,
      tags: fields.tags ?? ''
    }
  });

  return { post: newPost };
}

export async function deletePost(id: number): Promise<{ post: IPost | null }> {
  const deletePost = await prisma.post.delete({
    where: { id }
  });

  return { post: deletePost };
}