import { useRouter } from 'next/router'
import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toastr } from 'react-redux-toastr'

import { ITableItem } from '@/ui/admin-table/AdminTable/admin-table.interface'

import { useDebounce } from '@/hooks/useDebounce'

import { toastError } from '@/utils/toast-error'

import { getAdminUrl } from 'config/url.config'
import { TagService } from '@/services/tag.service'

export const useTags = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearch = useDebounce(searchTerm, 500)

	const queryData = useQuery(
		['tag list', debouncedSearch],
		() => TagService.getAll(debouncedSearch),
		{
			select: ({ data }) =>
				data.map(
					(tag): ITableItem => ({
						_id: tag._id,
						editUrl: getAdminUrl(`tag/edit/${tag._id}`),
						items: [tag.name, tag.slug],
					})
				),
			onError(error) {
				toastError(error, 'Тэг лист')
			},
		}
	)

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const { push } = useRouter()

	const { mutateAsync: createAsync } = useMutation(
		'create tag',
		() => TagService.create(),
		{
			onError(error) {
				toastError(error, 'Создание тэга')
			},
			onSuccess({ data: _id }) {
				toastr.success('Создание тэга', 'тэг создан')
				push(getAdminUrl(`tag/edit/${_id}`))
			},
		}
	)


	const { mutateAsync: deleteAsync } = useMutation(
		'delete genre',
		(tagId: string) => TagService.deleteTag(tagId),
		{
			onError(error) {
				toastError(error, 'Удаление тэга')
			},
			onSuccess() {
				toastr.success('Удаление тэга', 'тэг удален')
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