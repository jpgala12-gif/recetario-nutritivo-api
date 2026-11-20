import type { IRecipe } from './model.js';
export declare const getAllRecipesService: () => Promise<IRecipe[]>;
export declare const getRecipeByIdService: (id: string) => Promise<IRecipe>;
export declare const createRecipeService: (data: Partial<IRecipe>) => Promise<IRecipe>;
export declare const updateRecipeService: (id: string, data: Partial<IRecipe>) => Promise<IRecipe>;
export declare const deleteRecipeService: (id: string) => Promise<IRecipe>;
//# sourceMappingURL=service.d.ts.map