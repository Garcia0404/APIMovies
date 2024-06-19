import { createApp } from "./src/app.js";
import { MovieModel } from "./src/models/sqlite/movies.js";
createApp({movieModel:MovieModel})