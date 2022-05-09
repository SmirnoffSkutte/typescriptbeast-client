export interface IGenre {
        _id: string
        name: string
        slug: string
        description: string
}

export interface ITag {
	_id: string
	name: string
	slug: string
	description: string
}

export interface IParameters {
	year?: number
	duration: number
	country?: string
}

export interface IActor {
	_id: string
	photo: string
	name: string
	countMovies: number
	slug: string
}

export interface IMovie {
	_id: string
	poster?: string
	bigPoster?: string
	title: string
	parameters: IParameters
	description:string
	genres: IGenre[]
	actors: IActor[]
    tags:ITag[]
	countOpened: number
	videoUrl: string
	rating: number
	slug: string
}
