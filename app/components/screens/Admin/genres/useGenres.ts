import { useRouter } from 'next/router'
import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { ITableItem } from '@/ui/admin-table/AdminTable/admin-table.interface'

import { useDebounce } from '@/hooks/useDebounce'

import { GenreService } from '@/services/genre.service'

import { toastError } from '@/utils/toast-error'

import { getAdminUrl } from 'config/url.config'

export const useGenres = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)

	const queryData = useQuery(
		['genre list', debouncedSearch],
		() => GenreService.getAll(debouncedSearch),
		{
			select: ({ data }) =>
				data.map(
					(genre): ITableItem => ({
						_id: genre._id,
						editUrl: getAdminUrl(`genre/edit/${genre._id}`),
						items: [genre.name, genre.slug],
					})
				),
			onError(error) {
				toastError(error, 'Жанр лист')
			},
		}
	)

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const { push } = useRouter()

	const { mutateAsync: createAsync } = useMutation(
		'create genre',
		() => GenreService.create(),
		{
			onError(error) {
				toastError(error, 'Создание жанра')
			},
			onSuccess({ data: _id }) {
				toastr.success('Создание жанра', 'жанр создан')
				push(getAdminUrl(`genre/edit/${_id}`))
			},
		}
	)


	const { mutateAsync: deleteAsync } = useMutation(
		'delete genre',
		(genreId: string) => GenreService.deleteGenre(genreId),
		{
			onError(error) {
				toastError(error, 'Удаление жанра')
			},
			onSuccess() {
				toastr.success('Удаление жанра', 'жанр удален')
				queryData.refetch()
			},
		}
	)

	return useMemo(
		() => ({
			handleSearch,
			...queryData,
			searchTerm,
			deleteAsync,
			createAsync
		
		}),
		[queryData, searchTerm, deleteAsync,createAsync]
	)
}
