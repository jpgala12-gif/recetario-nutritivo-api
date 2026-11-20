import jwt from 'jsonwebtoken';
export const verifyToken = (req, res, next) => {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Token no proporcionado' });
        return;
    }
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        res.status(500).json({ message: 'Error interno del servidor' });
        return;
    }
    try {
        const payload = jwt.verify(header.slice(7), secret);
        res.locals.user = payload; // { id, role, iat, exp }
        next();
    }
    catch (_a) {
        res.status(401).json({ message: 'Token inválido o vencido' });
    }
};
//# sourceMappingURL=auth.middleware.js.map