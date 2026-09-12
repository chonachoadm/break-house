import express from "express";
import * as controllers from "../controllers/auth.controllers.js";
import { authenticate, authorizeAdmin, authorizeSuperAdmin } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.get("/users", authenticate, controllers.getUsers);
router.get("/users/:id", authenticate, [authorizeAdmin], controllers.getUserById);
router.post("/users",authenticate, [authorizeAdmin], controllers.saveUser);
router.put("/users/:id", authenticate, [authorizeAdmin], controllers.replaceUser);
router.patch("/users/:id", authenticate, [authorizeAdmin], controllers.updateUser);
router.delete("/users/:id", authenticate, [authorizeSuperAdmin], controllers.deleteUser);

router.post("/auth/login", controllers.loginUser);
router.post("/auth/register", controllers.registerUser);

export default router;