import { Router } from 'express';
import {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} from './controller.js';
import { verifyToken } from '../../middlewares/auth.middleware.js';

const router = Router();

router.get('/', getAllRecipes);
router.get('/:id', getRecipeById);
router.post('/', verifyToken, createRecipe);
router.put('/:id', verifyToken, updateRecipe);
router.delete('/:id', verifyToken, deleteRecipe);

export default router;