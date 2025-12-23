import 'dotenv/config';
import prisma from '../database/PrismaClient.ts';
import bcrypt from 'bcrypt'; 
import { Permission } from '../utils/enums/perm.enum.ts';
import generateToken from '../utils/modules/generateToken.ts';
import { IUser, IUserBase, IUserCreate } from '../utils/interfaces/user.interface.ts';
import { IPost, IPostCreate, IPostNoDate } from '../utils/interfaces/post.interface.ts';

export async function signup(userData: IUserCreate) {
  const hashedPassword = await bcrypt.hash(userData.password, 9);

  const user = await prisma.user.create({
    data: {
      user: userData.user,
      email: userData.email,
      password: hashedPassword,
      posts: {},
      permId: Permission.GUESS
    }
  });

  const token = generateToken({ id: user.id, email: user.email });

  return { login: user, token };
}

export async function getPosts(id?: number): Promise<{ posts: IPost[] | IPost }> {
  let posts: IPost[];

  if (id) posts = await prisma.post.findMany({ where: { id } });
  else posts = await prisma.post.findMany();

  if (!posts)
    throw new Error('No posts in database');

  return { posts };
}

export async function signin(userData: IUserBase) {
  let usr: IUser | null = null;

  if (userData.user)
    usr = await prisma.user.findFirst({ where: { user: userData.user } });
  else if (userData.email)
    usr = await prisma.user.findFirst({ where: { email: userData.email } });

  if (!usr)
    throw new Error('User not found');

  const { id, user, email, password } = usr;

  const isPasswordValid = await bcrypt.compare(userData.password, password);
  
  if (!isPasswordValid)
    throw new Error('Invalid credentials');

  const token = generateToken({ id, user, email });

  return { token };
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
  if (
    (!fields.title) ||
    (!fields.content) ||
    (!fields.summary) || 
    (!fields.authorId) ||
    (!fields.category)
  ) throw new Error('All obligatory fields of the post must be submitted');

  const newPost: IPost = await prisma.post.create({
    data: {
      ...fields,
      tags: fields.tags ?? ''
    }
  });

  return { post: newPost };
}

export async function deletePost(id: number): Promise<{ post: IPost | null }> {
  if (!id)
    throw new Error('ID post must be submitted');

  const deletePost = await prisma.post.delete({
    where: { id }
  });

  return { post: deletePost };
}