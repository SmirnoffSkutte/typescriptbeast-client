import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { useQuery } from 'react-query'

import SkeletonLoader from '@/components/ui/SkeletonLoaader'

import SubHeading from '@/ui/heading/SubHeading'

import { IMovie } from '@/shared/types/movie.types'

import { MovieService } from '@/services/movie.service'

import { getMovieUrl } from 'config/url.config'

import styles from '../Admin.module.scss'

const PopularMovie: FC = () => {
	const { isLoading, data: movie } = useQuery(
		'Most popular movie in admin',
		() => MovieService.getMostPopularMovies(),
		{
			select: (data): IMovie => data[0],
		}
	)

	return (
		<div className={cn(styles.block, styles.popular)}>
			<SubHeading title="Самый популярный фильм" />
			{isLoading ? (
				<SkeletonLoader className="h-48" />
			) : (
				movie && (
					<>
						<h1>{movie.title}</h1>
						<h3>Открыт {movie.countOpened} раз</h3>
						<Link href={getMovieUrl(movie.slug)}>
							<a>
								Картинка фильма
							</a>
						</Link>
					</>
				)
			)}
		</div>
	)
}

export default PopularMovie
