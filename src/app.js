import express from "express";
import cors from "cors";
import { createRouter } from "./routes/apiRoutes.js";
export const createApp = ({movieModel}) => {
  const app = express();
  const PORT = process.env.PORT || 4321;
  app.disable("x-powered-by");
  app.use(cors({
    origin:"*",
    methods:["GET"]
  }))
  app.use(express.json())
  app.get("/", (req, res) => {
    res.sendFile(process.cwd() + "/client/index.html");
  });
  app.use("/api/movies", createRouter({movieModel:movieModel}));
  app.use((req, res) => {
    res.status(404).json({ message: "404 NOT FOUND" });
  });
  app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
  });
};
