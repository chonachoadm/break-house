import { sectionsSchema } from "../schemas/sections.js";

export function validateSection(req, res, next) {
    console.log("Validando secciones");

    sectionsSchema.validate(req.body, { abortEarly: false, stripUnknown: true })
        .then(() => next())
        .catch((error) => res.status(400).json({ message: error.errors }))
}