import { useTags } from './useTags'
import { FC } from 'react'

import AdminNavigation from '@/ui/admin-navigation/AdminNavigation'
import AdminHeader from '@/ui/admin-table/AdminHeader/AdminHeader'
import AdminTable from '@/ui/admin-table/AdminTable/AdminTable'
import Heading from '@/ui/heading/Heading'

import Meta from '@/utils/meta/Meta'

const TagList: FC = () => {
	const {
		
		data,
		isLoading,
		deleteAsync,
		searchTerm,
		handleSearch,
		createAsync
	} = useTags()

	return (
		<Meta title="Tags">
			<AdminNavigation />
			<Heading title="Тэги" />
			<AdminHeader
				onClick={createAsync}
				searchTerm={searchTerm}
				handleSearch={handleSearch}
			/>
			<AdminTable
				tableItems={data || []}
				headerItems={['Тэг', 'Slug']}
				isLoading={isLoading}
				removeHandler={deleteAsync}
			/>
		</Meta>
	)
}

export default TagList
