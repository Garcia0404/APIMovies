import express from "express";
import cors from "cors";
import { createRouter } from "./routes/apiRoutes.js";
export var createApp = function(param) {
    var movieModel = param.movieModel;
    var app = express();
    var PORT = process.env.PORT || 4321;
    app.disable("x-powered-by");
    app.use(cors({
        origin: "*",
        methods: [
            "GET"
        ]
    }));
    app.use(express.json());
    app.get("/", function(req, res) {
        res.sendFile(process.cwd() + "/client/index.html");
    });
    app.use("/api/movies", createRouter({
        movieModel: movieModel
    }));
    app.use(function(req, res) {
        res.status(404).json({
            message: "404 NOT FOUND"
        });
    });
    app.listen(PORT, function() {
        console.log("Server listening on port http://localhost:".concat(PORT));
    });
};
