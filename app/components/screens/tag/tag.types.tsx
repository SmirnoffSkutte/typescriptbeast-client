import { IMovie, ITag } from '@/shared/types/movie.types'

export interface ITagPage {
	tag: ITag
	movies: IMovie[]
}
