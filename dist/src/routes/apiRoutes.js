import { Router } from "express";
import { MovieController } from "../controllers/movies.js";
export var createRouter = function(param) {
    var movieModel = param.movieModel;
    var router = Router();
    var movieController = new MovieController({
        movieModel: movieModel
    });
    router.get("/", movieController.getAll);
    router.post("/", movieController.create);
    router.get("/:id", movieController.getById);
    router.patch("/:id", movieController.update);
    return router;
};

//# sourceMappingURL=apiRoutes.js.map