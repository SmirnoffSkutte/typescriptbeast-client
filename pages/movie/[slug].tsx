import { errorCatch } from 'api/api.helpers'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import SingleMovie from '@/components/screens/single-movie/SingleMovie'
import { IGalleryItem } from '@/components/ui/gallery/gallery.interface'

import { IMovie } from '@/shared/types/movie.types'

import { MovieService } from '@/services/movie.service'

import { getMovieUrl } from 'config/url.config'

import Error404 from '../404'

const SingleMoviePage: NextPage<{
	movie: IMovie | undefined
	// similarMovies: IGalleryItem[]
}> = ({ movie}) => {
	return movie ? (
		<SingleMovie movie={movie} />
	) : (
		<Error404 />
	)
}

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: movies } = await MovieService.getMoviesNoPages()
		const paths = movies.map((movie) => ({
			params: { slug: movie.slug },
		}))

		return { paths, fallback: 'blocking' }
	} catch {
		return {
			paths: [],
			fallback: false,
		}
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const { data: movie } = await MovieService.getBySlug(String(params?.slug))

		// const responseSimilarMovies = await MovieService.getByGenres(
		// 	movie.genres.map((g) => g._id)
		// )

		// const similarMovies: IGalleryItem[] = responseSimilarMovies.data
		// 	.filter((m) => m._id !== movie._id)
		// 	.map((m) => ({
		// 		name: m.title,
		// 		posterPath: m.poster,
		// 		url: getMovieUrl(m.slug),
		// 	}))

		return {
			props: { movie },
			revalidate:60,
		}
	} catch (e) {
		console.log(errorCatch(e))

		return {
			notFound: true,
		}
	}
}

export default SingleMoviePage
