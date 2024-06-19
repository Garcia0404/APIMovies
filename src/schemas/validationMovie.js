import { z } from "zod";

const movieSchema = z.object({
  title:z.string(),
  year:z.number().int().min(1900).max(2025),
  genres:z.array(
    z.enum(['Sci-Fi','Adventure','Drama','Action','Crime','Fantasy','War','Biography','History','Thriller','Romance','Comedy','Mystery'])
  ),
  description:z.string(),
  director:z.string(),
  duration:z.number().int().min(40).max(240),
  image:z.string().url()
})
export const validationMovie = (object) => {
  const result = movieSchema.safeParse(object)
  return result
}
export const validationMoviePartial = (object) => {
  const result = movieSchema.partial().safeParse(object)
  return result
}