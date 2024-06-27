import { z } from "zod";
var movieSchema = z.object({
    title: z.string(),
    year: z.number().int().min(1900).max(2025),
    genres: z.array(z.enum([
        'Sci-Fi',
        'Adventure',
        'Drama',
        'Action',
        'Crime',
        'Fantasy',
        'War',
        'Biography',
        'History',
        'Thriller',
        'Romance',
        'Comedy',
        'Mystery'
    ])),
    description: z.string(),
    director: z.string(),
    duration: z.number().int().min(40).max(240),
    image: z.string().url()
});
export var validationMovie = function(object) {
    var result = movieSchema.safeParse(object);
    return result;
};
export var validationMoviePartial = function(object) {
    var result = movieSchema.partial().safeParse(object);
    return result;
};

//# sourceMappingURL=validationMovie.js.map