import SearchField from '@/components/ui/search-field/SearchField'
import { FC } from 'react'
import { useSearchActors } from './ActorSeachList/useSearchActors'
import styles from './Search.module.scss'
import ActorSearchList from './ActorSeachList/SearchList'
const SearchActors : FC = () => {
  const {isSuccess,handleSearch,data,searchTerm}=useSearchActors()
  return (
    <div className={styles.wrapper}>
      <SearchField searchTerm={searchTerm} handleSearch={handleSearch}/>
      {isSuccess && <ActorSearchList actors={data || []}/>}

    </div>
  )
}

export default SearchActors