import GenreEdit from '@/components/screens/Admin/genre/GenreEdit'

import { NextPageAuth } from '@/shared/types/auth.types'

const GenreEditPage: NextPageAuth = () => {
	return <GenreEdit />
}

GenreEditPage.isOnlyAdmin = true

export default GenreEditPage
