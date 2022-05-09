import axios, { axiosClassic } from 'api/interceptors'

import { ITagEditInput } from '@/components/screens/Admin/tag/tag-edit.interface'

// import { ICollection } from '@/components/screens/collections/collections.types'

import { ITag } from '@/shared/types/movie.types'

import { getTagsUrl } from 'config/api.config'

export const TagService = {
	async getBySlug(slug: string) {
		return axiosClassic.get<ITag>(getTagsUrl(`/by-slug/${slug}`))
	},

	async create() {
		return axios.post<string>(getTagsUrl(''))
	},

	async update(_id: string, data: ITagEditInput) {
		return axios.put<string>(getTagsUrl(`/${_id}`), data)
	},

	async deleteTag(_id: string) {
		return axios.delete<string>(getTagsUrl(`/${_id}`))
	},

	async getAll(searchTerm?: string) {
		return axiosClassic.get<ITag[]>(getTagsUrl(``), {
			params: searchTerm
				? {
						searchTerm,
				  }
				: {},
		})
	},

	// async getCollections() {
	// 	return axiosClassic.get<ICollection[]>(getTagsUrl('/collections'))
	// },

	async getById(_id: string) {
		return axios.get<ITagEditInput>(getTagsUrl(`/${_id}`))
	},

	async getPopularTags(limit: number = 4) {
		return axiosClassic.get<ITag[]>(getTagsUrl(`/popular`), {
			params: {
				limit,
			},
		})
	},
}

