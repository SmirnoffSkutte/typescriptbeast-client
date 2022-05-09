import { IActor} from '@/shared/types/movie.types'

export interface ICatalog {
	title: string
	description?: string
	actors:IActor[]
}
