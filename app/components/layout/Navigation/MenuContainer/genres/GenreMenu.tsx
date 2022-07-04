import SkeletonLoader from '@/components/ui/SkeletonLoaader'
import { FC } from 'react'
import Menu from '../Menu'

import { usePopularGenres } from './usePopularGenres'

const GenreMenu : FC = () => {
  const {isLoading,data} = usePopularGenres()
  const sortedData=data?.sort((a,b)=>a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1)
  return (
     isLoading ? (
     <div className='mx-11 mb-2'>
       <SkeletonLoader count={3} className='h-4 mt-3'/>
     </div>
     )
     : <Menu menu={{title:'Жанры',items:sortedData || [] }}/>
  )
}

export default GenreMenu