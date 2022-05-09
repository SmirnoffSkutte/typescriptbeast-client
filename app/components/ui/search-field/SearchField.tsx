import { ChangeEvent, FC } from 'react'
import styles from './SearchField.module.scss'

interface ISearchField {
	searchTerm: string
	handleSearch: (event: ChangeEvent<HTMLInputElement>) => void
}

const SearchField: FC<ISearchField> = ({ handleSearch, searchTerm }) => {
	return (
		<div className={styles.search}>
			{/* Иконка поиска */}
			<input placeholder="Поиск" value={searchTerm} onChange={handleSearch} />
		</div>
	)
}

export default SearchField
