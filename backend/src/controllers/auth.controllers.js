import * as service from "../services/auth.services.js";
import bcrypt from 'bcrypt';

export async function getUsers(req, res) {
    const result = await service.getUsers(req.query)
        .then(users => res.status(200).json(users))
        .catch(err => res.status(500).json({ message: "No se logró traer la lista de usuarios." }))

    return result;
}

export function getUserById(req, res) {
    const id = req.params.id

    service.getUserById(id)
        .then(user => {
            if (user) {
                return res.status(200).json(user)
            }
            return res.status(404).json({ message: "Usuario no encontrado." })
        })
        .catch(err => res.status(500).json({ message: "No se logró obtener al usuario." }))
}

export async function saveUser(req, res) {
    try {
        const result = await service.saveUser(req.body);

        return res.status(201).json(result);
    } catch (error) {
        console.error(error);

        return res.status(error.status || 500).json({
            message: error.message || "Error al guardar usuario",
        });
    }
}

export function replaceUser(req, res) {
    const id = req.params.id

    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }
    service.editUser(id, user)
        .then(user => {
            if (Object.keys(user) != 0) {
                return res.status(202).json(user)
            }
            return res.status(404).json({ message: "El usuario no existe." })

        })
        .catch(err => res.status(500).json({ message: "No se logró reemplazar el usuario." }))
}

export async function updateUser(req, res) {
    const id = req.params.id

    const originalUser = await service.getUserById(id)

    const user = {
        name: req.body?.name ? req.body?.name : originalUser.name,
        email: req.body?.email ? req.body?.email : originalUser.email,
        role: req.body?.role !== undefined ? req.body?.role : originalUser.role,
        ...(req.body?.password ? { password: req.body.password } : {}),
        // password: req.body?.password ? req.body?.password : originalUser.password,
    }
    service.editUser(id, user)
        .then(user => {
            if (Object.keys(user).length != 0) {
                return res.status(202).json(user)
            }
            return res.status(404).json({ message: "El usuario no existe." })

        })
        .catch(err => res.status(500).json({ message: "No se logró modificar el usuario." }))
}

export function deleteUser(req, res) {
    const id = req.params.id

    service.deleteUser(id)
        .then((user) => {
            if (Object.keys(user).length != 0) {
                return res.status(202).json(user)
            }
            return res.status(404).json({ message: "El usuario no existe." })
        })
        .catch(err => res.status(500).json({ message: "No se logró eliminar el usuario." }))
}

export async function loginUser(req, res) {
    console.log(req.body);
    try {
        const result = await service.loginUser(req.body);
        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(error.status || 500).json({
            message: error.message || "Error al ingresar a tu cuenta",
        });
    }
}

export async function registerUser(req, res) {
    try {
        const result = await service.saveUser(req.body);

        return res.status(201).json({
            message: "Usuario registrado correctamente"
        });
    } catch (error) {
        console.error(error);

        return res.status(error.status || 500).json({
            message: error.message || "Error al crear usuario",
        });
    }
}