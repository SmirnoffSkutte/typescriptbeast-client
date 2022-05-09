import axios, { axiosClassic } from 'api/interceptors'

import { IActorEditInput } from '@/components/screens/Admin/actor/actor-edit.interface'
import { ICollection } from '@/components/screens/collections/collections.interface'
import { IActor } from '@/shared/types/movie.types'

import { getActorsUrl } from 'config/api.config'

export const ActorService = {
	async getBySlug(slug: string) {
		return axiosClassic.get<IActor>(getActorsUrl(`/by-slug/${slug}`))
	},

	async create() {
		return axios.post<string>(getActorsUrl(''))
	},

	async update(_id: string, data: IActorEditInput) {
		return axios.put<string>(getActorsUrl(`/${_id}`), data)
	},

	async deleteActor(_id: string) {
		return axios.delete<string>(getActorsUrl(`/${_id}`))
	},

	async getAll(page?:number,searchTerm?: string) {
		return axiosClassic.get<IActor[]>(getActorsUrl(``), {
			params: searchTerm
				? {
						searchTerm
				  }
				: {page},
		})
	},

	async getAllNoPages(searchTerm?: string) {
		return axiosClassic.get<IActor[]>(getActorsUrl(`/no-pages`), {
			params: searchTerm
				? {
						searchTerm
				  }
				: {},
		})
	},

	async getById(_id: string) {
		return axios.get<IActorEditInput>(getActorsUrl(`/${_id}`))
	},

	async getCollections() {
		return axiosClassic.get<ICollection[]>(getActorsUrl('/collections'))
   },
}
