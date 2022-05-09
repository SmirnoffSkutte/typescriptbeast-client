import TagList from '@/components/screens/Admin/tags/TagsList'

import { NextPageAuth } from '@/shared/types/auth.types'

const TagListPage: NextPageAuth = () => {
	return <TagList />
}

TagListPage.isOnlyAdmin = true

export default TagListPage
