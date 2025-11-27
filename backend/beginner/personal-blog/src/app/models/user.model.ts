import 'dotenv/config';
import IPostTable, { IPost } from '../utils/interfaces/post.interface.ts';
import IUser from '../utils/interfaces/admin.interface.ts';
import { getCurrentDateFormat, isValidUser, isValidEmail } from '../utils/main.util.ts';
import prisma from '../database/PrismaClient.ts';
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken';

// export async function compareWithVerifiedAdm(userData: IAdmin): Promise<{ error: boolean, message: string }> {
//   const validAdmin = { user: 'test', email: 'test@hardcoded.com', password: 'isHardCodeAGoodPractice123' };

//   if ((!userData.user) || (!userData.email) || (!userData.password)) throw new Error();

//   await createDataBase(JSON.stringify([ validAdmin ]), dbPathAdmin);

//   for (let [ key ] of Object.entries(validAdmin))
//     if (userData[key as TAdminKeys] !== validAdmin[key as TAdminKeys]) throw new Error();

//   return {
//     error: false,
//     message: ''
//   };
// }

export async function signin(userData: IUser) {
  if (!userData) throw new Error('No data found');
  if (!userData.user && !userData.email) throw new Error('You must set an user or an email');
  if (userData.user && (!isValidUser(userData.user))) throw new Error('Invalid user');
  if (userData.email && (!isValidEmail(userData.email))) throw new Error('Invalid email');

  let usr: IUser | null = null;

  if (userData.user)
    usr = await prisma.user.findUnique({ where: { user: userData.user } });
  else if (userData.email)
    usr = await prisma.user.findUnique({ where: { email: userData.email } });

  if (!usr)
    throw new Error('User not found');

  const { password } = usr;

  const isPasswordValid = await bcrypt.compare(userData.password, password);
  
  if (!isPasswordValid)
    throw new Error('Invalid credentials');

  const token = jwt.sign({ userId: userData.id }, (process.env.JWT_SECRET as string), { expiresIn: '1h' });

  return { token };
}

export async function updatePostData(id: number, fields: IPost): Promise<{ article: IPostTable | null }> {
  if (!id)
    throw new Error('ID article must be submitted');
  if (
    (!fields.title) &&
    (!fields.author) &&
    (!fields.content) &&
    (!fields.summary) && 
    (!fields.category)
  ) throw new Error('At least one article upgradeable field must be submitted');

  const updateArticle: IPostTable | null = await prisma.post.update({
    where: { id },
    data: fields
  });

  return { article: updateArticle };
}

export async function createPost(fields: IPost): Promise<{ article: IPostTable }> {
  if (
    (!fields.title) ||
    (!fields.author) ||
    (!fields.content) ||
    (!fields.summary) || 
    (!fields.category)
  ) throw new Error('All obligatory fields of the article must be submitted');

  const newPost: IPostTable = await prisma.post.create({
    data: {
      ...fields,
      createdAt: getCurrentDateFormat(),
      updatedAt: getCurrentDateFormat()
    }
  });

  return { article: newPost };
}

export async function deletePost(id: number): Promise<{ article: IPostTable | null }> {
  if (!id)
    throw new Error('ID article must be submitted');

  const deletePost = await prisma.post.delete({
    where: { id }
  });

  return { article: deletePost };
}