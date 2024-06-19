import { moviesJson } from "../../utils/readJson.js";
import {randomUUID} from "crypto"
export class MovieModel {
  static getAll = async() => {
    const result = moviesJson()
    return result
  }
  static create = async({movie}) => {
    const id = randomUUID()
    const updatedMovie = {
      id,...movie
    }
    return updatedMovie
  }
}