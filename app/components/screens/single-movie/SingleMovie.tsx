// import dynamic from 'next/dynamic'
import { FC } from 'react'
import { IMovie } from '@/shared/types/movie.types'
import Meta from '@/utils/meta/Meta'
import VideoPlayer from '@/components/ui/videoplayer/VideoPlayer'
import Content from './Content/Content'
import { useUpdateCountOpened } from './useUpdateCountOpened'
import styles from './SingleMovie.module.scss'
const SingleMovie: FC<{ movie: IMovie}> = ({
	movie,
}) => {
	useUpdateCountOpened(movie.slug)

	return (
		<Meta title={movie.title} description={`Смотреть на PornPredator ${movie.title}`}>
		<div className={styles.mainWrapper}>
		<VideoPlayer videoSource={movie.videoUrl}></VideoPlayer>
		<Content movie={movie}></Content>
		</div>
		</Meta>
	)
}

export default SingleMovie
