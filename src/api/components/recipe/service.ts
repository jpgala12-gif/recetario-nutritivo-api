import mongoose from 'mongoose';
import type { IRecipe } from './model.js';
import {
  getAllRecipesDAO,
  getRecipeByIdDAO,
  createRecipeDAO,
  updateRecipeDAO,
  deleteRecipeDAO,
} from './dao.js';
import { AppError } from '../../utils/AppError.js';

const validateId = (id: string): void => {
  if (!mongoose.isValidObjectId(id)) {
    throw new AppError('El id no tiene un formato válido', 400);
  }
};

const validateRecipeData = (data: Partial<IRecipe>): void => {
  if (!data || Object.keys(data).length === 0) {
    throw new AppError('El cuerpo de la solicitud está vacío', 400);
  }
  if (data.tiempoPreparacion !== undefined && data.tiempoPreparacion <= 0) {
    throw new AppError('El tiempo de preparación debe ser mayor a 0', 400);
  }
  if (data.ingredientes !== undefined && data.ingredientes.length === 0) {
    throw new AppError('La receta debe tener al menos un ingrediente', 400);
  }
};

export const getAllRecipesService = async (): Promise<IRecipe[]> => {
  return await getAllRecipesDAO();
};

export const getRecipeByIdService = async (id: string): Promise<IRecipe> => {
  validateId(id);
  const recipe = await getRecipeByIdDAO(id);
  if (!recipe) throw new AppError('Receta no encontrada', 404);
  return recipe;
};

export const createRecipeService = async (data: Partial<IRecipe>): Promise<IRecipe> => {
  validateRecipeData(data);
  return await createRecipeDAO(data);
};

export const updateRecipeService = async (id: string, data: Partial<IRecipe>): Promise<IRecipe> => {
  validateId(id);
  validateRecipeData(data);
  const recipe = await updateRecipeDAO(id, data);
  if (!recipe) throw new AppError('Receta no encontrada', 404);
  return recipe;
};

export const deleteRecipeService = async (id: string): Promise<IRecipe> => {
  validateId(id);
  const recipe = await deleteRecipeDAO(id);
  if (!recipe) throw new AppError('Receta no encontrada', 404);
  return recipe;
};