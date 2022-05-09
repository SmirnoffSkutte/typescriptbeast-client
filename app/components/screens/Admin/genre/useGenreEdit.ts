import { IGenreEditInput } from './genre-edit.interface'
import { useRouter } from 'next/router'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { GenreService } from '@/services/genre.service'

import { toastError } from '@/utils/toast-error'
import { getKeys } from '@/utils/object/getKeys'

import { getAdminUrl } from 'config/url.config'

export const useGenreEdit = (setValue: UseFormSetValue<IGenreEditInput>) => {
	const { query, push } = useRouter()

	const genreId = String(query.id)

	const { isLoading } = useQuery(
		['genre', genreId],
		() => GenreService.getById(genreId),
		{
			onSuccess({ data }) {
				getKeys(data).forEach((key) => {
					setValue(key, data[key])
				})
			},
			onError(error) {
				toastError(error, 'Получение жанра')
			},
			enabled: !!query.id,
		}
	)

	const { mutateAsync } = useMutation(
		'update genre',
		(data: IGenreEditInput) => GenreService.update(genreId, data),
		{
			onError(error) {
				toastError(error, 'Обновление жанра')
			},
			onSuccess() {
				toastr.success('Обновление жанра', 'жанр обновлен')
				push(getAdminUrl('genres'))
			},
		}
	)

	const onSubmit: SubmitHandler<IGenreEditInput> = async (data) => {
		await mutateAsync(data)
	}

	return { onSubmit, isLoading }
}
