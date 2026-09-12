import express from "express";
import * as controllers from "../controllers/sections.controllers.js";
import { validateSection } from "../middlewares/sections.middlewares.js";
import { authenticate, authorizeAdmin, authorizeSuperAdmin } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.get("/sections", authenticate, controllers.getSections);
router.get("/sections/:id", authenticate, controllers.getSectionById);
router.post("/sections", authenticate, [authorizeAdmin, validateSection], controllers.saveSection);
router.patch("/sections/:id", authenticate, [authorizeAdmin, validateSection], controllers.updateSection);
router.put("/sections/:id", authenticate, [authorizeAdmin, validateSection], controllers.replaceSection);
router.delete("/sections/:id", authenticate, [authorizeAdmin], controllers.deleteSection);


export default router;