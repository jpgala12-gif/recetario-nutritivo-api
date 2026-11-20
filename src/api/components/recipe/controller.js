var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getAllRecipesService, getRecipeByIdService, createRecipeService, updateRecipeService, deleteRecipeService, } from './service.js';
import { handleError } from '../../utils/handleError.js';
export const getAllRecipes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipes = yield getAllRecipesService();
        res.status(200).json(recipes);
    }
    catch (error) {
        handleError(res, error);
    }
});
export const getRecipeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipe = yield getRecipeByIdService(req.params.id);
        res.status(200).json(recipe);
    }
    catch (error) {
        handleError(res, error);
    }
});
export const createRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipe = yield createRecipeService(req.body);
        res.status(201).json(recipe);
    }
    catch (error) {
        handleError(res, error);
    }
});
export const updateRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recipe = yield updateRecipeService(req.params.id, req.body);
        res.status(200).json(recipe);
    }
    catch (error) {
        handleError(res, error);
    }
});
export const deleteRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield deleteRecipeService(req.params.id);
        res.status(200).json({ message: 'Receta eliminada correctamente' });
    }
    catch (error) {
        handleError(res, error);
    }
});
//# sourceMappingURL=controller.js.map