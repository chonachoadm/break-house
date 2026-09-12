import { getDB } from "../config/db.js";
import { ObjectId } from "mongodb"
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const USER = 0;
const ADMIN = 1;
const SUPERADMIN = 2;


export async function getUsers() {
    try {
        const db = getDB();
        const users = await db.collection("users").find({ hidden: { $ne: true } }).toArray()

        return users;
    } catch (error) {
        throw error;
    }
}

export async function getUserById(id) {
    try {
        const db = getDB();
        const user = await db.collection("users").findOne({ _id: new ObjectId(id) })

        return user;
    } catch (error) {
        throw error;
    }
}

export async function saveUser(user) {
    try {
        const db = getDB();
        const exists = await db.collection("users").findOne({ email: user.email });
        if (exists) throw new Error("Ya hay un usuario registrado con este email.");

        if (user.password !== user.passwordConf) {
            throw new Error("Las contraseñas no coinciden.")
        }
        user.password = await bcrypt.hash(user.password, 11)
        await db.collection("users").insertOne({ ...user, passwordConf: undefined, role: USER})

        return { ...user, password: undefined, passwordConf: undefined }
    } catch (error) {
        throw error;
    }
}

export async function editUser(id, user) {
    try {
        const db = getDB();

        const updateData = { ...user };

        if (updateData.password) {
        if (typeof updateData.password === "string" && !updateData.password.startsWith("$2")) {
            updateData.password = await bcrypt.hash(updateData.password, 11);
        }
        } else {
        delete updateData.password;
        }

        await db.collection("users").updateOne({ _id: new ObjectId(id) }, {
            $set: updateData
        })
        return updateData;
    } catch (error) {
        throw error;
    }
}

export async function deleteUser(id) {
    try {
        const db = getDB();
        await db.collection("users").updateOne({ _id: new ObjectId(id) }, {
            $set: {
                hidden: true
            }
        })
        return id
    } catch (error) {
        throw error;
    }
}

export async function loginUser(credentials) {
    const db = getDB();
    const user = await db.collection("users").findOne({ email: credentials.email });
    if (!user) {
        const err = new Error("Usuario no encontrado");
        err.status = 404;
        throw err;
    };
    console.log(user.password);
    const validPassword = await bcrypt.compare(
        credentials.password,
        user.password
    );
    if (!validPassword) {
        const err = new Error("Contraseña incorrecta");
        err.status = 401;
        throw err;
    }
    if( !user?.role ) user.role = USER;
    const token = jwt.sign(
        { 
            id: user._id,
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
    );


    return {
        user: { email: user.email, }, token
    };
}