import { loginSchema, registerSchema } from "../schemas/auth.js";
import jwt from "jsonwebtoken";

export function validateLogin(req, res, next) {
    loginSchema.validate(req.body)
        .then(() => next())
        .catch((err) => res.status(400).json({ message: err.errors }))
}


export function validateRegister(req, res, next) {
    registerSchema.validate(req.body, { abortEarly: false, stripUnknown: true })
        .then(() => next())
        .catch((err) => res.status(400).json({ message: err.errors }))
}

export function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Authorization header requerido."
        });
    }

    if (!authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Formato de token inválido."
        });
    }

    const token = authHeader.split(" ")[1];
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Token inválido o expirado."
        });
    }
}

export function authorizeAdmin (req, res,next) {
    const role = req.user.role

    if(role >= 1) return next()
    return res.status(401).json({ message: "Usuario no autorizado." })
}

export function authorizeSuperAdmin (req, res,next) {
    const role = req.user.role

    if(role >= 2) return next()
    return res.status(401).json({ message: "Usuario no autorizado." })
}