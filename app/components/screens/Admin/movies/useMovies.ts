import { useRouter } from 'next/router'
import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { ITableItem } from '@/ui/admin-table/AdminTable/admin-table.interface'

import { useDebounce } from '@/hooks/useDebounce'

import { MovieService } from '@/services/movie.service'

import { toastError } from '@/utils/toast-error'
import { getGenresList } from '@/utils/movie/getGenresListEach'

import { getAdminUrl } from 'config/url.config'
import { getTagsList } from '@/utils/movie/getTagsListEach'

export const useMovies = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)

	const queryData = useQuery(
		['movie list', debouncedSearch],
		() => MovieService.getMoviesNoPages(debouncedSearch),
		{
			select: ({ data }) =>
				data.map(
					(movie): ITableItem => ({
						_id: movie._id,
						editUrl: getAdminUrl(`movie/edit/${movie._id}`),
						items: [
							movie.title,
							getGenresList(movie.genres),
                            getTagsList(movie.tags),
							String(movie.rating),
						],
					})
				),
			onError(error) {
				toastError(error, 'movie list')
			},
		}
	)

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const { push } = useRouter()

	const { mutateAsync: createAsync } = useMutation(
		'create movie',
		() => MovieService.create(),
		{
			onError(error) {
				toastError(error, 'Создание фильма')
			},
			onSuccess({ data: _id }) {
				toastr.success('Создание фильма', 'фильм создан')
				push(getAdminUrl(`movie/edit/${_id}`))
			},
		}
	)


	const { mutateAsync: deleteAsync } = useMutation(
		'delete movie',
		(movieId: string) => MovieService.deleteMovie(movieId),
		{
			onError(error) {
				toastError(error, 'Удаление фильма')
			},
			onSuccess() {
				toastr.success('Удаление фильма', 'фильм удален')
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
