import { Schema, model, Document } from 'mongoose';
const recipeSchema = new Schema({
    nombre: { type: String, required: true },
    ingredientes: { type: [String], required: true },
    tiempoPreparacion: { type: Number, required: true },
    dificultad: { type: String, enum: ['Fácil', 'Media', 'Difícil'], required: true }
}, {
    timestamps: true,
    versionKey: false
});
export const RecipeModel = model('Recipe', recipeSchema);
//# sourceMappingURL=model.js.map