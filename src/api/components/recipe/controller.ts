import type { Request, Response } from 'express';
import {
  getAllRecipesService,
  getRecipeByIdService,
  createRecipeService,
  updateRecipeService,
  deleteRecipeService,
} from './service.js';
import { handleError } from '../../utils/handleError.js';

export const getAllRecipes = async (req: Request, res: Response) => {
  try {
    const recipes = await getAllRecipesService();
    res.status(200).json(recipes);
  } catch (error) {
    handleError(res, error);
  }
};

export const getRecipeById = async (req: Request, res: Response) => {
  try {
    const recipe = await getRecipeByIdService(req.params.id as string);
    res.status(200).json(recipe);
  } catch (error) {
    handleError(res, error);
  }
};

export const createRecipe = async (req: Request, res: Response) => {
  try {
    const recipe = await createRecipeService(req.body);
    res.status(201).json(recipe);
  } catch (error) {
    handleError(res, error);
  }
};

export const updateRecipe = async (req: Request, res: Response) => {
  try {
    const recipe = await updateRecipeService(req.params.id as string, req.body);
    res.status(200).json(recipe);
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteRecipe = async (req: Request, res: Response) => {
  try {
    await deleteRecipeService(req.params.id as string);
    res.status(200).json({ message: 'Receta eliminada correctamente' });
  } catch (error) {
    handleError(res, error);
  }
};