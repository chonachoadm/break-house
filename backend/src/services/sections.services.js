import { getDB } from "../config/db.js";
import { ObjectId } from "mongodb"

export async function getSections() {
    try {
        const db = getDB();
        const sections = await db.collection("sections").find({ hidden: { $ne: true } }).toArray();

        return sections;
    } catch (error) {
        console.error(error);

    }
}

export async function getSectionById(id) {
    try {
        const db = getDB();
        const section = await db.collection("sections").findOne({ _id: new ObjectId(id) });

        return section;
    } catch (error) {
        console.error(error);
    }
}

export async function saveSection(section) {
    try {
        const db = getDB();
        const newSection = await db.collection("sections").insertOne(section);

        return newSection;
    } catch (error) {
        console.error(error);
    }
}

export async function editSection(id, section) {
    try {
        const db = getDB();
        await db.collection("sections").updateOne({ _id: new ObjectId(id) }, {
            $set: section
        })

        return section;
    } catch (error) {
        console.error(error);
    }
}

export async function deleteSection(id) {
    try {
        const db = getDB();
        await db.collection("sections").updateOne({ _id: new ObjectId(id) }, {
            $set: {
                hidden: true
            }
        })

        return id;
    } catch (error) {
        console.error(error);
    }
}

