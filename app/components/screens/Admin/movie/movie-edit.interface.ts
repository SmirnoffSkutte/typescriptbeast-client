import { IMovie } from '@/shared/types/movie.types'

export interface IMovieEditInput
	extends Omit<IMovie, '_id' | 'rating' | 'countOpened' | 'genres' | 'actors' | 'tags' > {
	genres: string[]
	actors: string[]
    tags:string[]
}
