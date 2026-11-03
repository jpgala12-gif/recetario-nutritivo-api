import { Schema, model, Document } from 'mongoose';

export interface IRecipe extends Document {
  nombre: string;
  ingredientes: string[];
  tiempoPreparacion: number;
  dificultad: 'Fácil' | 'Media' | 'Difícil';
}

const recipeSchema = new Schema<IRecipe>({
  nombre: { type: String, required: true },
  ingredientes: { type: [String], required: true },
  tiempoPreparacion: { type: Number, required: true },
  dificultad: { type: String, enum: ['Fácil', 'Media', 'Difícil'], required: true }
}, {
  timestamps: true,
  versionKey: false
});
export const RecipeModel = model('Recipe', recipeSchema);