import { UserModel } from './model.js';
import type { IUser } from './model.js';

export const findUserByEmailDAO = async (email: string): Promise<IUser | null> => {
  return await UserModel.findOne({ email });
};

export const createUserDAO = async (userData: Partial<IUser>): Promise<IUser> => {
  return await UserModel.create(userData);
};