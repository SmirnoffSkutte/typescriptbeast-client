import { useMovies } from './useMovies'
import { FC } from 'react'

import AdminNavigation from '@/ui/admin-navigation/AdminNavigation'
import AdminHeader from '@/ui/admin-table/AdminHeader/AdminHeader'
import AdminTable from '@/ui/admin-table/AdminTable/AdminTable'
import Heading from '@/ui/heading/Heading'

import Meta from '@/utils/meta/Meta'

const MovieList: FC = () => {
	const {
		
		data,
		isLoading,
		deleteAsync,
		searchTerm,
		handleSearch,
		createAsync
	} = useMovies()

	return (
		<Meta title="Movies">
			<AdminNavigation />
			<Heading title="Фильмы" />
			<AdminHeader
				onClick={createAsync}
				handleSearch={handleSearch}
				searchTerm={searchTerm}
			/>
			<AdminTable
				tableItems={data || []}
				headerItems={['Название', 'Жанры','Тэги','Рейтинг']}
				isLoading={isLoading}
				removeHandler={deleteAsync}
			/>
		</Meta>
	)
}

export default MovieList
