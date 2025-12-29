import 'dotenv/config';
import prisma from '../database/PrismaClient.ts';
import bcrypt from 'bcrypt'; 
import { Permission } from '../utils/enums/perm.enum.ts';
import { IUser, IUserBase, IUserCreate } from '../utils/interfaces/user.interface.ts';
import { IPost, IPostCreate, IPostNoDate } from '../utils/interfaces/post.interface.ts';

export async function signup(userData: IUserCreate) {
  const hashedPassword = await bcrypt.hash(userData.password, 9);

  const user = await prisma.user.create({
    data: {
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
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

  if (!user)
    throw new Error('User not found');

  const { id, name, email, password } = user;

  const isPasswordValid = await bcrypt.compare(userData.password, password);
  
  if (!isPasswordValid)
    throw new Error('Invalid credentials');

  return { id, name, email };
}

export async function getPosts(id?: number): Promise<{ posts: IPost[] | IPost }> {
  let posts: IPost[];

  if (id) posts = await prisma.post.findMany({ where: { id } });
  else posts = await prisma.post.findMany();

  if (!posts)
    throw new Error('No posts in database');

  return { posts };
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
       (!fields.title)
    || (!fields.content)
    || (!fields.summary) 
    || (!fields.authorId)
    || (!fields.category)
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