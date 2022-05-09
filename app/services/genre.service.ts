import axios, { axiosClassic } from 'api/interceptors'

import { IGenreEditInput } from '@/components/screens/Admin/genre/genre-edit.interface'

import { ICollection } from '@/components/screens/collections/collections.interface'

import { IGenre } from '@/shared/types/movie.types'

import { getGenresUrl } from 'config/api.config'

export const GenreService = {
	async getBySlug(slug: string) {
		return axiosClassic.get<IGenre>(getGenresUrl(`/by-slug/${slug}`))
	},

	async create() {
		return axios.post<string>(getGenresUrl(''))
	},

	async update(_id: string, data: IGenreEditInput) {
		return axios.put<string>(getGenresUrl(`/${_id}`), data)
	},

	async deleteGenre(_id: string) {
		return axios.delete<string>(getGenresUrl(`/${_id}`))
	},

	async getAll(searchTerm?: string) {
		return axiosClassic.get<IGenre[]>(getGenresUrl(``), {
			params: searchTerm
				? {
						searchTerm,
				  }
				: {},
		})
	},

	async getCollections() {
	 	return axiosClassic.get<ICollection[]>(getGenresUrl('/collections'))
	},

	async getById(_id: string) {
		return axios.get<IGenreEditInput>(getGenresUrl(`/${_id}`))
	},

	async getPopularGenres(limit: number = 4) {
		return axiosClassic.get<IGenre[]>(getGenresUrl(`/popular`), {
			params: {
				limit,
			},
		})
	},
}
