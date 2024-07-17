const z = require('zod');

const movieSchema = z.object({
    title: z.string({
        invalid_type_error: 'movie title must be a string',
        required_error: 'movie title is required'
    }),
    year: z.number().int().min(1800).max(2024),
    director: z.string(),
    duration: z.number().int().positive(),
    rate: z.number().min(0).max(10).optional(),
    poster: z.string().url(),
    genre: z.array(z.enum(['Action', 'Adventure', 'Crime', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi']))
});

function validateMovie (object) {
    return movieSchema.safeParse(object);
}

function validatePartialMovie (object) {
    return movieSchema.partial().safeParse(object);
}
module.exports = {
    validateMovie, validatePartialMovie
};
