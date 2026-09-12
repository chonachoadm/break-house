import { videosSchema } from "../schemas/videos.js";

export function validateVideo(req, res, next) {
    console.log("Validando videos");

    videosSchema.validate(req.body, { abortEarly: false, stripUnknown: true })
        .then(() => next())
        .catch((error) => res.status(400).json({ message: error.errors }))
}