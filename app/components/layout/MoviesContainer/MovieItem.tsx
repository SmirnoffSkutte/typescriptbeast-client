import { IMovie } from '@/shared/types/movie.types'
import { getGenresListEach } from '@/utils/movie/getGenresListEach'
import { getTagsListEach } from '@/utils/movie/getTagsListEach'
import { getGenresUrl, getTagsUrl } from 'config/api.config'
import { getMovieUrl } from 'config/url.config'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import styles from './MovieList.module.scss'
const MovieItem : FC<{movie:IMovie}>= ({movie}) => {
  return (
    <div className={styles.item}>
        <Link href={getMovieUrl(movie.slug)}>
            <a>
                {/* Картинка {movie.title} */}
				<Image
						alt={movie.title}
						width={65}
						height={97}
						src={movie.poster || ''}
						draggable={false}
						priority
					/>
            </a>
        </Link>
        <div className={styles.info}>
				<div>
					<div className={styles.title}>{movie.title}</div>
					<div className={styles.genres}>
						{movie.genres.map(({ slug, name, _id }, idx) => (
							<Link key={_id} href={getGenresUrl(slug)}>
								<a>{getGenresListEach(idx, movie.genres.length, name)}</a>
							</Link>
						))}
					</div>
					<div className={styles.genres}>
						{movie.tags.map(({ slug, name, _id }, idx) => (
							<Link key={_id} href={getTagsUrl(slug)}>
								<a>{getTagsListEach(idx, movie.tags.length, name)}</a>
							</Link>
						))}
					</div>
				</div>
				<div className={styles.rating}>
					Иконки рейтинга
					<span className='text-yellow-700'>{movie.rating.toFixed(1)}</span>
				</div>
			</div>

    </div>
  )
}

export default MovieItem