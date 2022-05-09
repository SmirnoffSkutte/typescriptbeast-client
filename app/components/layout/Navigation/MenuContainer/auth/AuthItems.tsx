import { FC } from 'react'

import { useAuth } from '@/hooks/useAuth'

import { getAdminHomeUrl } from 'config/url.config'

import MenuItem from '../MenuItem'

import LogoutButton from './LogoutButton'

const AuthItems: FC = () => {
	const { user } = useAuth()

	return (
		<>
			{user ? (
				<>
					{/* <MenuItem
						item={{
							link: '/profile',
							title: 'Профиль',
						}}
					/> */}
					<LogoutButton />
					<MenuItem item={{link:'/favoritesPage',title:'Избранное'}}/>
				</>
			) : (
				<MenuItem item={{ link: '/auth', title: 'Логин' }} />
			)}

			{user?.isAdmin && (
				<MenuItem
					item={{
						link: getAdminHomeUrl(),
						title: 'Admin panel',
					}}
				/>
			)}
		</>
	)
}

export default AuthItems
