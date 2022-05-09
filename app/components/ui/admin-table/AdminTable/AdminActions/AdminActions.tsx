import { useRouter } from 'next/router'
import { FC } from 'react'

import styles from './AdminActions.module.scss'

interface IAdminActions {
	editUrl: string
	removeHandler: () => void
}

const AdminActions: FC<IAdminActions> = ({ editUrl, removeHandler }) => {
	const { push } = useRouter()

	return (
		<div className={styles.actions}>
			<button onClick={() => push(editUrl)}>
				{/* <MaterialIcon name="MdEdit" /> */}
                edit
			</button>
			<button onClick={removeHandler}>
				{/* <MaterialIcon name="MdClose" /> */}
                delete
			</button>
		</div>
	)
}

export default AdminActions
