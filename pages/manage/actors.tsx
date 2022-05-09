import ActorList from '@/components/screens/Admin/actors/ActorList'

import { NextPageAuth } from '@/shared/types/auth.types'

const ActorListPage: NextPageAuth = () => {
	return <ActorList />
}

ActorListPage.isOnlyAdmin = true

export default ActorListPage
