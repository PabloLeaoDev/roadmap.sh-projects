import { Post } from '../../../generated/prisma/client.ts';

export type IPostBase = Omit<Post, 'id' | 'createdAt' | 'updatedAt'>;
export type IPostCreate = IPostBase;
export type IUserUpdate = Partial<IPostCreate>;
export type IPost = Post;
export type IPostNoDate = Omit<IPost, 'createdAt' | 'updatedAt'>;
