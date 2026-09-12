import { getDB } from "../config/db.js";
import { ObjectId } from "mongodb"

export async function getVideos() {
    try {
        const db = getDB();
        const videos = await db.collection("videos").find({ hidden: { $ne: true } }).toArray();
        return videos;
    } catch (error) {
        console.error(error);
    }
}

export async function getVideoById(id) {
    try {
        const db = getDB();
        const video = await db.collection("videos").findOne({ _id: new ObjectId(id) })

        return video;
    } catch (error) {
        console.error(error);
    }
}

export async function getVideosBySection(id) {
    try {
        const db = getDB();
        const videos = await db.collection("videos").find({ sectionId: new ObjectId(id), hidden: { $ne: true } }).toArray();

        return videos;
    } catch (error) {
        console.error(error)
    }
}

export async function saveVideo(video) {
    try {
        const db = getDB();
        const newVideo = await db.collection("videos").insertOne(video);

        return newVideo;
    } catch (error) {
        console.error(error);
    }
}

export async function editVideo(id, video) {
    try {
        const db = getDB();
        console.log("UPDATE VIDEO ID:", id);
        console.log("DATA:", video);
        await db.collection("videos").updateOne({ _id: new ObjectId(id) }, {
            $set: video
        })

        return video;
    } catch (error) {
        console.error(error);
    }
}

export async function deleteVideo(id) {
    try {
        const db = getDB();
        const result = await db.collection("videos").updateOne({ _id: new ObjectId(id) }, {
            $set: {
                hidden: true
            }
        })

        return result;
    } catch (error) {
        console.error(error);
    }
}