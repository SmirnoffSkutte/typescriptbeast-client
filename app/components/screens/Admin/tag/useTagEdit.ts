import { ITagEditInput } from './tag-edit.interface'
import { useRouter } from 'next/router'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { TagService } from '@/services/tag.service'

import { toastError } from '@/utils/toast-error'
import { getKeys } from '@/utils/object/getKeys'

import { getAdminUrl } from 'config/url.config'

export const useTagEdit = (setValue: UseFormSetValue<ITagEditInput>) => {
	const { query, push } = useRouter()

	const tagId = String(query.id)

	const { isLoading } = useQuery(
		['tag', tagId],
		() => TagService.getById(tagId),
		{
			onSuccess({ data }) {
				getKeys(data).forEach((key) => {
					setValue(key, data[key])
				})
			},
			onError(error) {
				toastError(error, 'Получение тэга')
			},
			enabled: !!query.id,
		}
	)

	const { mutateAsync } = useMutation(
		'update tag',
		(data: ITagEditInput) => TagService.update(tagId, data),
		{
			onError(error) {
				toastError(error, 'Обновление тэга')
			},
			onSuccess() {
				toastr.success('Обновление тэга', 'тэг обновлен')
				push(getAdminUrl('tags'))
			},
		}
	)

	const onSubmit: SubmitHandler<ITagEditInput> = async (data) => {
		await mutateAsync(data)
	}

	return { onSubmit, isLoading }
}
