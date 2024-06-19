import { validationMovie, validationMoviePartial } from '../schemas/validationMovie.js'
export class MovieController {
  constructor({movieModel}){
    this.movieModel = movieModel
  }
  getAll = async(req,res) => {
    const result = await this.movieModel.getAll()
    res.json(result)
  }
  create = async(req,res) => {
    const movieValidated = validationMovie(req.body)
    if(movieValidated.error){
      return res.status(422).json({ message: 'Unprocessable Content',error:JSON.parse(movieValidated.error)})
    }
    const result = await this.movieModel.create({movie:movieValidated.data})
    res.json(result)
  }
  getById = async(req,res) => {
    const {id} = req.params
    const result = await this.movieModel.getById({id:id})
    if(!result) return res.status(404).json({message:"Id not exist"})
    res.json(result)
  }
  update = async(req,res) => {
    const {id} = req.params
    const movieValidated = validationMoviePartial(req.body)
    if(movieValidated.error){
      return res.status(422).json({message:"Unprocessable Entity",error:JSON.parse(movieValidated.error)})
    }
    const result = await this.movieModel.update({id:id,update:movieValidated.data})
    if(!result) return res.status(404).json({message:"Id not exist"})
    res.json(result)
  }
}