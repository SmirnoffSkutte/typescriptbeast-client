import SearchField from '@/components/ui/search-field/SearchField'
import { FC } from 'react'
import SearchList from './SeachList/SearchList'
import { useSearch } from './SeachList/useSearch'
import styles from './Search.module.scss'
const Search : FC = () => {
  const {isSuccess,handleSearch,data,searchTerm}=useSearch()
  return (
    <div className={styles.wrapper}>
      <SearchField searchTerm={searchTerm} handleSearch={handleSearch}/>
      {isSuccess && <SearchList movies={data || []}/>}

    </div>
  )
}

export default Search