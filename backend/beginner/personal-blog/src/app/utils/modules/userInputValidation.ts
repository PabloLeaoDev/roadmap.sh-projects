import isValidEmail from './isValidEmail.ts';
import isValidUser from './isValidUser.ts';
import isValidPassword from './isValidPassword.ts';
import { IUserBase } from '../interfaces/user.interface.ts';
import { MakeOptional } from '../interfaces/utility.interface.ts';

export default function userInputValidation(
  userData: 
    Omit<
      MakeOptional<
        IUserBase & { confirmPassword: string },
        'confirmPassword'
      >, 
      'permId'
    >,
  isSignup: boolean = false
): void {
  if ((!userData.name) && (!userData.email))
    throw new Error('You must set an user or an email');
  
  if (
    userData.name &&
    (!isValidUser(userData.name))
  ) throw new Error('Invalid user');

  if (
    userData.email &&
    (!isValidEmail(userData.email))
  ) throw new Error('Invalid email');

  if (
    userData.password &&
    (!isValidPassword(userData.password))
  ) throw new Error('Invalid password');

  if (isSignup) {
    if (!userData.confirmPassword)
      throw new Error('You must confirm your password');

    if (userData.confirmPassword !== userData.password) 
      throw new Error('The passwords do not match');
  }
}