import { useQuery } from 'react-query'

import { IOption } from '@/ui/select/select.interface'

import { TagService } from '@/services/tag.service'

import { toastError } from '@/utils/toast-error'

export const useAdminTags = () => {
	const queryData = useQuery('list of tag', () => TagService.getAll(), {
		select: ({ data }) =>
			data.map(
				(tag): IOption => ({
					label: tag.name,
					value: tag._id,
				})
			),
		onError(error) {
			toastError(error, 'tag list')
		},
	})

	return queryData
}
