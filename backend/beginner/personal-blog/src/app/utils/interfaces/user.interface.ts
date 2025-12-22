import { User } from '../../../generated/prisma/client.ts';

export type IUserBase = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
export type IUserCreate = IUserBase;
export type IUserUpdate = Partial<IUserCreate>;
export type IUser = User;
