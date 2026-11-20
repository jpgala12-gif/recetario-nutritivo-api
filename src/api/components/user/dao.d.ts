import type { IUser } from './model.js';
export declare const findUserByEmailDAO: (email: string) => Promise<IUser | null>;
export declare const createUserDAO: (userData: Partial<IUser>) => Promise<IUser>;
//# sourceMappingURL=dao.d.ts.map