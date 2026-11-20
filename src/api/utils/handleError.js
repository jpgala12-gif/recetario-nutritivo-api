import mongoose from 'mongoose';
import { AppError } from './AppError.js';
export const handleError = (res, error) => {
    if (error instanceof AppError) {
        res.status(error.status).json({ message: error.message });
        return;
    }
    if (error instanceof mongoose.Error.ValidationError) {
        res.status(400).json({ message: error.message });
        return;
    }
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
};
//# sourceMappingURL=handleError.js.map