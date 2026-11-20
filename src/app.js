var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db/connection.js';
import recipeRoutes from './api/components/recipe/routes.js';
import userRoutes from './api/components/user/routes.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use('/api/recipes', recipeRoutes);
app.use('/api/users', userRoutes);
app.use((err, req, res, next) => {
    if (err.type === 'entity.parse.failed') {
        res.status(400).json({ message: 'El JSON enviado no es válido' });
        return;
    }
    res.status(500).json({ message: 'Error interno del servidor' });
});
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    yield connectDB();
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
});
start();
//# sourceMappingURL=app.js.map