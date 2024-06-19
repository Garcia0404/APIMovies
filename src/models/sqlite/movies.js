import { createClient } from "@libsql/client";
import { randomUUID } from "crypto";
import dotenv from "dotenv";
dotenv.config();
const db = createClient({
  url: process.env.SQLITE_URL,
  authToken: process.env.SQLITE_TOKEN,
});
export class MovieModel {
  static getAll = async () => {
    const movies = await db.execute(`
      SELECT * FROM movie  
    `);
    const moviesr = movies.rows;
    const movieUpdated = await Promise.all(
      moviesr.map(async (movie) => {
        const genres_id = await db.execute({
          sql: `SELECT genre_id FROM movie_genre WHERE movie_id=?`,
          args: [movie.id],
        });
        const genres_idr = genres_id.rows;
        const genres = await Promise.all(
          genres_idr.map(async (id) => {
            const gnrs = await db.execute({
              sql: `SELECT name FROM genre WHERE id=?`,
              args: [id.genre_id],
            });
            return gnrs.rows[0].name;
          })
        );
        const updated = {
          ...movie,
          genres
        }
        return updated;
      })
    );
    return movieUpdated;
  };
  static create = async ({ movie }) => {
    const { title, year, description, director, duration, image,genres } = movie;
    await db.execute({
      sql: `INSERT INTO movie(title,year,description,director,duration,image) VALUES (?,?,?,?,?,?)`,
      args: [title, year, description, director, duration, image],
    });
    await Promise.all(genres.map(async(genre) => {
      await db.execute({
        sql:`INSERT INTO movie_genre(movie_id,genre_id) VALUES ((SELECT id FROM movie WHERE title=?),(SELECT id FROM genre WHERE name=?));`,
        args:[title,genre]
      })
      return
    }))
    const id = await db.execute({
      sql:`SELECT id FROM movie WHERE title=?`,
      args:[title]
    })
    const uuid = id.rows[0].id
    return {id:uuid,...movie };
  };
  static getById = async ({ id }) => {
    const movie = await db.execute({
      sql: `SELECT * FROM movie WHERE id=?`,
      args: [id],
    });
    if (movie.length === 0) {
      return null;
    }
    return movie.rows[0];
  };
  static update = async ({ id, update }) => {
    const movie = await db.execute({
      sql: `SELECT * FROM movie WHERE id=?`,
      args: [id],
    });
    if (movie.length === 0) {
      return null;
    }
    const movieUpdated = {
      ...movie.rows[0],
      ...update,
    };
    await db.execute({
      sql: `UPDATE movie 
      SET title=?,
      year=?,
      description=?,
      director=?,
      duration=?,
      image=?
      WHERE id=?;`,
      args: [
        movieUpdated.title,
        movieUpdated.year,
        movieUpdated.description,
        movieUpdated.director,
        movieUpdated.duration,
        movieUpdated.image,
        id,
      ],
    });
    return movieUpdated;
  };
}
