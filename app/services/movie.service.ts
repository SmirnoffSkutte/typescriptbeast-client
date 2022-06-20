import axios, { axiosClassic } from 'api/interceptors'

import { IMovieEditInput } from '@/components/screens/Admin/movie/movie-edit.interface'

import { IMovie } from '@/shared/types/movie.types'

import { getMoviesUrl } from 'config/api.config'

export const MovieService = {
	async getBySlug(slug: string) {
		return axiosClassic.get<IMovie>(getMoviesUrl(`/by-slug/${slug}`))
	},

	async getByActor(page:number,actorId?: string) {
		return axiosClassic.get<IMovie[]>(getMoviesUrl(`/by-actor/${actorId}`),{
			params: page
				? {
						page,
				  }
				: {},
		})
	},

	async getByGenres(genreIds: string[],page:number) {
		return axiosClassic.post<IMovie[]>(getMoviesUrl(`/by-genres`), {
			genreIds,page
				// params: page
				// ? 
				// 	page
				  
				// : "",
		})
	},

	async getByTags(tagIds: string[],page:number) {
		return axiosClassic.post<IMovie[]>(getMoviesUrl(`/by-tags`), {
			tagIds,page
		})
	},


	async create() {
		return axios.post<string>(getMoviesUrl(''))
	},

	async updateCountOpened(slug: string) {
		return axiosClassic.put(getMoviesUrl('/update-count-opened'), {
			slug,
		})
	},

	async update(_id: string, data: IMovieEditInput) {
		return axios.put<string>(getMoviesUrl(`/${_id}`), data)
	},

	async deleteMovie(_id: string) {
		return axios.delete<string>(getMoviesUrl(`/${_id}`))
	},

	async getMovies(page?:number,searchTerm?: string,) {
		return axiosClassic.get<IMovie[]>(getMoviesUrl(``), {
			params: searchTerm
			? {
					searchTerm,
			  }
			: {page}
		})
	},

	async getMoviesNoPages(searchTerm?: string) {
		return axiosClassic.get<IMovie[]>(getMoviesUrl(`/no-pages`), {
			params: searchTerm
			? {
					searchTerm,
			  }
			: {}
		})
	},

	async getById(_id: string) {
		return axios.get<IMovieEditInput>(getMoviesUrl(`/${_id}`))
	},

	async getMostPopularMovies() {
		const { data: movies } = await axiosClassic.get<IMovie[]>(
			getMoviesUrl('/most-popular')
		)

		return movies
	},
}
