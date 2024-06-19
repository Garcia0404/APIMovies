import { Router } from "express";
import { MovieController } from "../controllers/movies.js";
export const createRouter = ({movieModel}) => {
  const router = Router();
  const movieController = new MovieController({movieModel:movieModel});
  router.get("/", movieController.getAll)
  router.post("/",movieController.create)
  router.get("/:id",movieController.getById)
  router.patch("/:id",movieController.update)
  return router
};
