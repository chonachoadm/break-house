import express from "express";
import * as controllers from "../controllers/videos.controllers.js";
import { validateVideo } from "../middlewares/videos.middlewares.js";
import { authenticate, authorizeAdmin, authorizeSuperAdmin } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.get("/videos", authenticate, controllers.getVideos);
router.get("/videos/section/:id", authenticate, controllers.getVideosBySection);
router.get("/videos/:id", authenticate, controllers.getVideoById);
router.post("/videos", authenticate, [authorizeAdmin, validateVideo], controllers.saveVideo);
router.patch("/videos/:id", authenticate, [authorizeAdmin, validateVideo], controllers.updateVideo);
router.put("/videos/:id", authenticate, [authorizeAdmin, validateVideo], controllers.replaceVideo);
router.delete("/videos/:id", authenticate,[authorizeSuperAdmin], controllers.deleteVideo);


export default router;