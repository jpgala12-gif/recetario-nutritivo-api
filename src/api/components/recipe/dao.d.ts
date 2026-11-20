import type { IRecipe } from './model.js';
export declare const getAllRecipesDAO: () => Promise<IRecipe[]>;
export declare const getRecipeByIdDAO: (id: string) => Promise<IRecipe | null>;
export declare const createRecipeDAO: (recipeData: Partial<IRecipe>) => Promise<IRecipe>;
export declare const updateRecipeDAO: (id: string, recipeData: Partial<IRecipe>) => Promise<IRecipe | null>;
export declare const deleteRecipeDAO: (id: string) => Promise<IRecipe | null>;
//# sourceMappingURL=dao.d.ts.map