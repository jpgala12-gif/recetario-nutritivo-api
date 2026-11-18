import express from 'express';
import type { Request, Response, NextFunction } from 'express';
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
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.type === 'entity.parse.failed') {
    res.status(400).json({ message: 'El JSON enviado no es válido' });
    return;
  }
  res.status(500).json({ message: 'Error interno del servidor' });
});

const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
};

start();