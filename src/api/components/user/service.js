var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { findUserByEmailDAO, createUserDAO } from './dao.js';
import { AppError } from '../../utils/AppError.js';
const SALT_ROUNDS = 10;
const requireCredentials = (email, password) => {
    if (typeof email !== 'string' || typeof password !== 'string' || !email.trim() || !password) {
        throw new AppError('El email y la contraseña son obligatorios', 400);
    }
    return { email: email.trim().toLowerCase(), password };
};
export const registerService = (emailInput, passwordInput) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = requireCredentials(emailInput, passwordInput);
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        throw new AppError('El email no tiene un formato válido', 400);
    }
    if (password.length < 6) {
        throw new AppError('La contraseña debe tener al menos 6 caracteres', 400);
    }
    if (yield findUserByEmailDAO(email)) {
        throw new AppError('El email ya está registrado', 400);
    }
    const hashedPassword = yield bcrypt.hash(password, SALT_ROUNDS);
    // El rol NO se toma del body: siempre se crea como 'user'
    const user = yield createUserDAO({ email, password: hashedPassword, role: 'user' });
    return { id: String(user._id), email: user.email, role: user.role };
});
export const loginService = (emailInput, passwordInput) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = requireCredentials(emailInput, passwordInput);
    const user = yield findUserByEmailDAO(email);
    const passwordOk = user ? yield bcrypt.compare(password, user.password) : false;
    if (!user || !passwordOk) {
        // Mismo mensaje en ambos casos para no revelar si el email existe
        throw new AppError('Credenciales inválidas', 401);
    }
    const secret = process.env.JWT_SECRET;
    if (!secret)
        throw new AppError('Falta JWT_SECRET en el archivo .env', 500);
    // Solo datos no sensibles en el token: id y rol
    return jwt.sign({ id: String(user._id), role: user.role }, secret, { expiresIn: '1h' });
});
//# sourceMappingURL=service.js.map