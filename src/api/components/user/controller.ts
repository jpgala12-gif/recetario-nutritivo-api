import type { Request, Response } from 'express';
import { registerService, loginService } from './service.js';
import { handleError } from '../../utils/handleError.js';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body ?? {};
    const user = await registerService(email, password);
    res.status(201).json(user);
  } catch (error) {
    handleError(res, error);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body ?? {};
    const token = await loginService(email, password);
    res.status(200).json({ token });
  } catch (error) {
    handleError(res, error);
  }
};