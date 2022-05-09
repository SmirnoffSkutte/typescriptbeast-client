import { FC } from 'react'

import { IMovie } from '@/shared/types/movie.types'

import { getActorUrl,getGenreUrl, getTagUrl } from 'config/url.config'

// import FavoriteButton from '../FavoriteButton/FavoriteButton'

import styles from './Content.module.scss'
import ContentList from './ContentList/ContentList'
import Description from '@/components/ui/heading/Descsription'
import FavoriteButton from '../FavoriteButton/FavoriteButton'
import RateMovie from '../RateMovie/RateMovie'

const Content: FC<{ movie: IMovie }> = ({ movie }) => {
	return (
		<div className={styles.content}>
			<div className={styles.likeRateViewsWrapper}>
				<div className={styles.views}>👁 {movie.countOpened}</div>
				<RateMovie slug={movie.slug} _id={movie._id}/>
				<div className={styles.likeRateWrapper}>
					<div className={styles.rating}>
						<Description text='Рейтинг:' className={styles.description}/>
							<span>{movie.rating.toFixed(1)}</span>
					</div>
				<FavoriteButton movieId={movie._id}/>
				</div>
			</div>
			<div className={styles.contWrap}>
			<h2>{movie.title}</h2>
			<Description text={movie.description} className={styles.description}/>

			<ContentList
				name="Категории"
				links={movie.genres.map((g) => ({
					link: getGenreUrl(g.slug),
					title: g.name,
					_id: g._id,
				}))}
			/>
			<ContentList
				name="Актеры"
				links={movie.actors.map((a) => ({
					link: getActorUrl(a.slug),
					title: a.name,
					_id: a._id,
				}))}
			/>
            <ContentList
				name="Тэги"
				links={movie.tags.map((t) => ({
					link: getTagUrl(t.slug),
					title: t.name,
					_id: t._id,
				}))}
			/>
			</div>
		</div>
	)
}

export default Content
