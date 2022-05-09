import TagEdit from '@/components/screens/Admin/tag/TagEdit'

import { NextPageAuth } from '@/shared/types/auth.types'

const TagEditPage: NextPageAuth = () => {
	return <TagEdit />
}

TagEditPage.isOnlyAdmin = true

export default TagEditPage
