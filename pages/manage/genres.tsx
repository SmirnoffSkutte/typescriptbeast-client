import GenreList from '@/components/screens/Admin/genres/GenreList'

import { NextPageAuth } from '@/shared/types/auth.types'

const GenreListPage: NextPageAuth = () => {
	return <GenreList />
}

GenreListPage.isOnlyAdmin = true

export default GenreListPage
