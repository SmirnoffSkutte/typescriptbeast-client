import { ITag } from '@/shared/types/movie.types'

export interface ITagEditInput extends Omit<ITag, '_id'> {}
