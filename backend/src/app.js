import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import authRouter from "./routes/auth.routes.js"
import videosRouter from "./routes/videos.routes.js"
import sectionsRouter from "./routes/sections.routes.js"

// Lo agregué porque de la nada comenzó a fallar el lanzamiento del backend
import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);
// Lo agregué porque de la nada comenzó a fallar el lanzamiento del backend

await connectDB();

const app = express();

app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://final-ah-f76b6.web.app"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  }
}));
app.use(authRouter);
app.use(videosRouter);
app.use(sectionsRouter);


app.get("/", (req, res) => {
    res.json({ message: "API funcionando" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});