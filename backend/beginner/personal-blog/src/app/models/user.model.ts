import 'dotenv/config';
import IPostTable, { IPost } from '../utils/interfaces/post.interface.ts';
import IUser from '../utils/interfaces/admin.interface.ts';
import { isValidUser, isValidEmail, isValidPassword } from '../utils/main.util.ts';
import prisma from '../database/PrismaClient.ts';
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken';
import { Permission } from '../utils/enums/perm.enum.ts';

export async function signup(userData: IUser) {
  if (!userData) throw new Error('No data found');
  if (!userData.user || !userData.email) throw new Error('You must set an user or an email');
  if (!userData.password) throw new Error('You must set a password');
  // Improve Validations Errors
  if (userData.user && (!isValidUser(userData.user))) throw new Error('Invalid user');
  if (userData.email && (!isValidEmail(userData.email))) throw new Error('Invalid email');
  if (userData.password && (!isValidPassword(userData.password))) throw new Error('Invalid password');

  const hashedPassword = await bcrypt.hash(userData.password, 9);

  const user = await prisma.user.create({
    data: {
      user: userData.user,
      email: userData.email,
      password: hashedPassword,
      posts: {},
      permId: Permission.USER
    }
  });

  const token = jwt.sign({ id: user.id }, (process.env.JWT_SECRET as string), { expiresIn: '1d' });

  return { login: user, token };
}

export async function getPosts(id?: number): Promise<{ posts: IPostTable[] | IPostTable }> {
  let posts: IPostTable[];

  if (id) posts = await prisma.post.findMany({ where: { id } });
  else posts = await prisma.post.findMany();

  if (!posts)
    throw new Error('No posts in database');

  return { posts };
}

export async function signin(userData: IUser) {
  if (!userData) throw new Error('No data found');
  if (!userData.user && !userData.email) throw new Error('You must set an user or an email');
  if (userData.user && (!isValidUser(userData.user))) throw new Error('Invalid user');
  if (userData.email && (!isValidEmail(userData.email))) throw new Error('Invalid email');

  let usr: IUser | null = null;

  if (userData.user)
    usr = await prisma.user.findFirst({ where: { user: userData.user } });
  else if (userData.email)
    usr = await prisma.user.findFirst({ where: { email: userData.email } });

  if (!usr)
    throw new Error('User not found');

  const { password } = usr;

  const isPasswordValid = await bcrypt.compare(userData.password, password);
  
  if (!isPasswordValid)
    throw new Error('Invalid credentials');

  const token = jwt.sign({ userId: userData.id }, (process.env.JWT_SECRET as string), { expiresIn: '1h' });

  return { token };
}

export async function updatePostData(id: number, fields: IPost): Promise<{ post: IPostTable | null }> {
  if (!id)
    throw new Error('ID post must be submitted');
  if (
    (!fields.title) &&
    (!fields.authorId) &&
    (!fields.content) &&
    (!fields.summary) && 
    (!fields.category)
  ) throw new Error('At least one post upgradeable field must be submitted');

  const updatePost: IPostTable | null = await prisma.post.update({
    where: { id },
    data: {
      ...fields,
      tags: fields.tags ?? ''
    }
  });

  return { post: updatePost };
}

export async function createPost(fields: IPost): Promise<{ post: IPostTable }> {
  if (
    (!fields.title) ||
    (!fields.authorId) ||
    (!fields.content) ||
    (!fields.summary) || 
    (!fields.category)
  ) throw new Error('All obligatory fields of the post must be submitted');

  const newPost: IPostTable = await prisma.post.create({
    data: {
      ...fields,
      tags: fields.tags ?? ''
    }
  });

  return { post: newPost };
}

export async function deletePost(id: number): Promise<{ post: IPostTable | null }> {
  if (!id)
    throw new Error('ID post must be submitted');

  const deletePost = await prisma.post.delete({
    where: { id }
  });

  return { post: deletePost };
}