var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose from 'mongoose';
import { getAllRecipesDAO, getRecipeByIdDAO, createRecipeDAO, updateRecipeDAO, deleteRecipeDAO, } from './dao.js';
import { AppError } from '../../utils/AppError.js';
const validateId = (id) => {
    if (!mongoose.isValidObjectId(id)) {
        throw new AppError('El id no tiene un formato válido', 400);
    }
};
const validateRecipeData = (data) => {
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
export const getAllRecipesService = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield getAllRecipesDAO();
});
export const getRecipeByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    validateId(id);
    const recipe = yield getRecipeByIdDAO(id);
    if (!recipe)
        throw new AppError('Receta no encontrada', 404);
    return recipe;
});
export const createRecipeService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    validateRecipeData(data);
    return yield createRecipeDAO(data);
});
export const updateRecipeService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    validateId(id);
    validateRecipeData(data);
    const recipe = yield updateRecipeDAO(id, data);
    if (!recipe)
        throw new AppError('Receta no encontrada', 404);
    return recipe;
});
export const deleteRecipeService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    validateId(id);
    const recipe = yield deleteRecipeDAO(id);
    if (!recipe)
        throw new AppError('Receta no encontrada', 404);
    return recipe;
});
//# sourceMappingURL=service.js.map