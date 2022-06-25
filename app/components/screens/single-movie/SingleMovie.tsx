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
		<Meta title={movie.title} description={`Смотреть на PornPredator ${movie.title}`}>
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
			Заходя на этот сайт вы подтверждаете, что являетесь совершеннолетним и что посещение этого веб-сайта не является нарушением законодательства.
Все ролики на сайте - постановочные, всем моделям больше 18 лет, все видео взяты из открытых интернет источников.Мы соблюдаем 18 U.S.C. 2257 RKRCS, согласно которому, все лица (актеры, актрисы) достигли 18 лет на момент съемок.Если вы считаете, что на сайте есть фотографии или видео нарушающие закон,то пишите на почту natusvivere@proton.me,мы обязательно рассмотрим вашу жалобу/претензию.По поводу рекламы/предложений и т.д также пишите на natusvivere@proton.me
			</h3>
		</div>
		</Meta>
	)
}

export default SingleMovie
