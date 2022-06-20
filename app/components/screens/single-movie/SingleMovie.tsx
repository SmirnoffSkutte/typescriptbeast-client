// import dynamic from 'next/dynamic'
import { FC } from 'react'
import { IMovie } from '@/shared/types/movie.types'
import Meta from '@/utils/meta/Meta'
import VideoPlayer from '@/components/ui/videoplayer/VideoPlayer'
import Content from './Content/Content'
import { useUpdateCountOpened } from './useUpdateCountOpened'
import styles from './SingleMovie.module.scss'
import { IGalleryItem } from '@/components/ui/gallery/gallery.interface'
import Gallery from '@/components/ui/gallery/Gallery'
import Catalog from '@/components/ui/catalog-movies/Catalog'
const SingleMovie: FC<{ movie: IMovie,similarMovies:IMovie[]}> = ({
	movie,similarMovies
}) => {
	useUpdateCountOpened(movie.slug)

	return (
		<Meta title={movie.title} description={`Смотреть на PornPredator ${movie.title}`}>
		<div className={styles.mainWrapper}>
		<VideoPlayer videoSource={movie.videoUrl}></VideoPlayer>
		<Content movie={movie}></Content>
		</div>
		<div className='mt-3'>
		<Catalog
			movies={similarMovies || []}
			title="Похожие видео"
			description=""
		/>
		</div>
		</Meta>
	)
}

export default SingleMovie
