import * as service from "../services/sections.services.js";

export async function getSections(req, res) {
    const result = await service.getSections(req.query)
        .then(sections => res.status(200).json(sections))
        .catch(err => res.status(500).json({ message: "No se logró traer la lista de secciones." }))

    return result;
}

export function getSectionById(req, res) {
    const id = req.params.id

    service.getSectionById(id)
        .then(section => {
            if (section) {
                return res.status(200).json(section)
            }
            return res.status(404).json({ message: "Sección no encontrada." })
        })
        .catch(err => res.status(500).json({ message: "No se logró obtener la sección." }))
}

export function saveSection(req, res) {
    const section = {
        name: req.body.name,
        description: req.body.description
    }
    service.saveSection(section)
        .then(section => res.status(202).json(section))
        .catch(err => res.status(500).json({ message: "Error al guardar la nueva sección." }))
}

export function replaceSection(req, res) {
    const id = req.params.id

    const section = {
        name: req.body.name,
        description: req.body.description,
    }
    service.editSection(id, section)
        .then(section => {
            if (Object.keys(section) != 0) {
                return res.status(202).json(section)
            }
            return res.status(404).json({ message: "La sección no existe." })

        })
        .catch(err => res.status(500).json({ message: "No se logró reemplazar la sección." }))
}

export async function updateSection(req, res) {
    const id = req.params.id

    const originalSection = await service.getSectionById(id)

    const section = {
        name: req.body?.name ? req.body?.name : originalSection.name,
        description: req.body?.description ? req.body?.description : originalSection.description,
    }
    service.editSection(id, section)
        .then(section => {
            if (Object.keys(section).length != 0) {
                return res.status(202).json(section)
            }
            return res.status(404).json({ message: "La sección no existe." })

        })
        .catch(err => res.status(500).json({ message: "No se logró modificar la sección." }))
}

export function deleteSection(req, res) {
    const id = req.params.id

    service.deleteSection(id)
        .then((section) => {
            if (Object.keys(section).length != 0) {
                return res.status(202).json(section)
            }
            return res.status(404).json({ message: "La sección no existe." })
        })
        .catch(err => res.status(500).json({ message: "No se logró eliminar la sección." }))
}