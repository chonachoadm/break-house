import { ObjectId } from "mongodb";
import * as service from "../services/videos.services.js";

export async function getVideos(req, res) {
    const result = await service.getVideos(req.query)
        .then(videos => res.status(200).json(videos))
        .catch(err => res.status(500).json({ message: "No se logró traer la lista de videos." }))

    return result;
}

export function getVideoById(req, res) {
    const id = req.params.id

    service.getVideoById(id)
        .then(video => {

            if (video) {
                return res.status(200).json(video)
            }
            return res.status(404).json({ message: "Video no encontrado." });
        })
        .catch(err => res.status(500).json({ message: "No se logró obtener el video." }))
}

export function getVideosBySection(req, res) {
    const id = req.params.id

    service.getVideosBySection(id)
        .then(videos => {

            if (videos) {
                return res.status(200).json(videos)
            }
            return res.status(404).json({ message: "No se encontraron los videos de esta categoría." });
        })
        .catch(err => res.status(500).json({ message: "No se lograron traer los videos de esta categoría." }))
}



export function saveVideo(req, res) {
    const video = {
        title: req.body.title,
        link_yt: req.body.link_yt,
        level: req.body.level,
        sectionId: new ObjectId(req.body.sectionId)
    }
    service.saveVideo(video)
        .then(video => res.status(202).json(video))
        .catch(err => res.status(500).json({ message: "Error al guardar el nuevo video." }))
}

export function replaceVideo(req, res) {
    const id = req.params.id

    const video = {
        title: req.body.title,
        link_yt: req.body.link_yt,
        level: req.body.level,
        sectionId: new ObjectId(req.body.sectionId)
    }
    service.editVideo(id, video)
        .then(video => {
            if (Object.keys(video) != 0) {
                return res.status(202).json(video)
            }
            return res.status(404).json({ message: "El video no existe." })

        })
        .catch(err => res.status(500).json({ message: "No se logró reemplazar el video." }))
}

export async function updateVideo(req, res) {
    const id = req.params.id

    const originalVideo = await service.getVideoById(id)

    const video = {
        title: req.body?.title ? req.body?.title : originalVideo.title,
        link_yt: req.body?.link_yt ? req.body?.link_yt : originalVideo.link_yt,
        level: req.body?.level ? req.body?.level : originalVideo.level,
        sectionId: new ObjectId(req.body?.sectionId ? new ObjectId(req.body.sectionId) : originalVideo.sectionId)
    }
    service.editVideo(id, video)
        .then(video => {
            if (Object.keys(video).length != 0) {
                return res.status(202).json(video)
            }
            return res.status(404).json({ message: "El video no existe." })

        })
        .catch(err => res.status(500).json({ message: "No se logró modificar el video." }))
}

export function deleteVideo(req, res) {
    const id = req.params.id;

    service.deleteVideo(id)
        .then(result => {
            if (result.matchedCount === 0) {
                return res.status(404).json({
                    message: "El video no existe."
                });
            }

            return res.status(200).json({
                message: "Video eliminado correctamente."
            });
        })
        .catch(() =>
            res.status(500).json({
                message: "No se logró eliminar el video."
            })
        );
}