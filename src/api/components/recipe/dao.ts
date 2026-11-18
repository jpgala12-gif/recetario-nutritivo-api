import { RecipeModel } from './model.js';
import type { IRecipe } from './model.js';
 
export const getAllRecipesDAO = async (): Promise<IRecipe[]> => {
  return await RecipeModel.find();
};

export const getRecipeByIdDAO = async (id: string): Promise<IRecipe | null> => {
  return await RecipeModel.findById(id);
};

export const createRecipeDAO = async (recipeData: Partial<IRecipe>): Promise<IRecipe> => {
  return await RecipeModel.create(recipeData);
};

export const updateRecipeDAO = async (id: string, recipeData: Partial<IRecipe>): Promise<IRecipe | null> => {
  return await RecipeModel.findByIdAndUpdate(id, recipeData, {
    returnDocument: 'after',
    runValidators: true,
  });
};

export const deleteRecipeDAO = async (id: string): Promise<IRecipe | null> => {
  return await RecipeModel.findByIdAndDelete(id);
};