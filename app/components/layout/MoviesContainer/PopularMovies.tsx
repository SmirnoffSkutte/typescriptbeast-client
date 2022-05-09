import SkeletonLoader from '@/components/ui/SkeletonLoaader'
import { MovieService } from '@/services/movie.service'
import { FC } from 'react'
import { useQuery } from 'react-query'
import MoviesList from './MovieList'

const PopularMovies : FC = () => {

    const {isLoading,data:popularMovies}=useQuery('Popular movies main',()=> MovieService.getMostPopularMovies())
    
  return (
    isLoading ? <div>
        <SkeletonLoader count={3} h-28/>
    </div> : <MoviesList link='/trending' movies={popularMovies || []} title='Популярное'/>
  )
}

export default PopularMovies