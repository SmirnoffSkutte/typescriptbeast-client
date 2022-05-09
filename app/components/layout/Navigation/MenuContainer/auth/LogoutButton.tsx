import { FC, MouseEvent } from 'react'

import { useActions } from '@/hooks/useActions'

const LogoutButton: FC = () => {
	const { logout } = useActions()

	const logoutHandler = (e: MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault()
		logout()
	}

	return (
		<li>
			<a onClick={logoutHandler}>
				{/* Иконка? */}
				<span>Логаут</span>
			</a>
		</li>
	)
}

export default LogoutButton
