import { createApp } from "./app.js";
import { MovieModel } from "./models/sqlite/movies.js";
createApp({movieModel:MovieModel})