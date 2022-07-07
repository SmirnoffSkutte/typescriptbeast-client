// import dynamic from 'next/dynamic'
import { FC } from 'react'
import { IMovie } from '@/shared/types/movie.types'
import Meta from '@/utils/meta/Meta'
import VideoPlayer from '@/components/ui/videoplayer/VideoPlayer'
import Content from './Content/Content'
import { useUpdateCountOpened } from './useUpdateCountOpened'
import styles from './SingleMovie.module.scss'
import CatalogNoMeta from '@/components/ui/catalog-movies/CatalogNoMeta'
const SingleMovie: FC<{ movie: IMovie,similarMovies:IMovie[]}> = ({
	movie,similarMovies
}) => {
	useUpdateCountOpened(movie.slug)

	return (
		<Meta title={movie.title} description={`Смотреть на typescriptbeast.ru ${movie.title}`}>
		<div className={styles.mainWrapper}>
		<VideoPlayer videoSource={movie.videoUrl} poster={movie.poster}></VideoPlayer>
		<Content movie={movie}></Content>
		</div>
		<div className='mt-3'>
		<CatalogNoMeta
			movies={similarMovies || []}
			title='Похожие видео'
			description=""
		/>
		</div>
		<div className='border-t-2 border-orange-300'>
			<h3 className='text-white'>
			Подвал сайта
			</h3>
		</div>
		</Meta>
	)
}

export default SingleMovie
