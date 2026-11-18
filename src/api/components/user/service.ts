import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { findUserByEmailDAO, createUserDAO } from './dao.js';
import { AppError } from '../../utils/AppError.js';

const SALT_ROUNDS = 10;

const requireCredentials = (email: unknown, password: unknown): { email: string; password: string } => {
  if (typeof email !== 'string' || typeof password !== 'string' || !email.trim() || !password) {
    throw new AppError('El email y la contraseña son obligatorios', 400);
  }
  return { email: email.trim().toLowerCase(), password };
};

export const registerService = async (emailInput: unknown, passwordInput: unknown) => {
  const { email, password } = requireCredentials(emailInput, passwordInput);

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    throw new AppError('El email no tiene un formato válido', 400);
  }
  if (password.length < 6) {
    throw new AppError('La contraseña debe tener al menos 6 caracteres', 400);
  }
  if (await findUserByEmailDAO(email)) {
    throw new AppError('El email ya está registrado', 400);
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  // El rol NO se toma del body: siempre se crea como 'user'
  const user = await createUserDAO({ email, password: hashedPassword, role: 'user' });

  return { id: String(user._id), email: user.email, role: user.role };
};

export const loginService = async (emailInput: unknown, passwordInput: unknown): Promise<string> => {
  const { email, password } = requireCredentials(emailInput, passwordInput);

  const user = await findUserByEmailDAO(email);
  const passwordOk = user ? await bcrypt.compare(password, user.password) : false;
  if (!user || !passwordOk) {
    // Mismo mensaje en ambos casos para no revelar si el email existe
    throw new AppError('Credenciales inválidas', 401);
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) throw new AppError('Falta JWT_SECRET en el archivo .env', 500);

  // Solo datos no sensibles en el token: id y rol
  return jwt.sign({ id: String(user._id), role: user.role }, secret, { expiresIn: '1h' });
};