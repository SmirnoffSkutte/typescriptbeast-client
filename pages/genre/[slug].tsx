// import { errorCatch } from 'api/api.helpers'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Genre from '@/screens/genre/Genre'
import { GenreService } from '@/services/genre.service'
import { MovieService } from '@/services/movie.service'
import Error404 from '../404'
import { IGenrePage } from '@/components/screens/genre/genre.types'
import { useEffect, useState } from 'react'
import { IMovie } from '@/shared/types/movie.types'

const GenrePage: NextPage<IGenrePage> = ({ genre, movies }) => {
	const [data,setData]=useState<IMovie[]>(movies)
	const [currentPage,setCurrentPage]=useState<number>(2)
	const [fetching,setFetching]=useState(false)
	useEffect(()=>{
		setCurrentPage(2)
		setData(movies)
	},[genre])
	useEffect(()=>{
		if(fetching){
		// console.log('fetching')
		MovieService.getByGenres([genre._id],currentPage)
		.then(res=>{
			setData([...data,...res.data])
			setCurrentPage(prevState=>prevState+1)
		})
		.finally(()=>setFetching(false))
	}
	},[fetching])
	useEffect(()=>{
		document.addEventListener('scroll',scrollHandler)

		return function () {
			document.removeEventListener('scroll',scrollHandler)
		}
	},[])
	const scrollHandler = (e:any) => {
		if(e.target.documentElement.scrollHeight-(e.target.documentElement.scrollTop+window.innerHeight)<100){
			setFetching(true)
		}
	}
	return genre ? 
	<div>
	<Genre genre={genre} movies={data} />
	</div>
	: <Error404 />
}

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: genres } = await GenreService.getAll()
		const paths = genres.map((g) => ({
			params: { slug: g.slug },
		}))

		return {
			paths,
			fallback: 'blocking',
		}
	} catch (e) {
		// console.log(errorCatch(e))

		return {
			paths: [],
			fallback: false,
		}
	}
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const { data: genre } = await GenreService.getBySlug(String(params?.slug))

		const { data: movies } = await MovieService.getByGenres([genre._id],1)

		return {
			props: { genre, movies },
			revalidate:60,
		}
	} catch (e) {
		// console.log(errorCatch(e))

		return {
			props: {},
			// notFound: true,
		}
	}
}


export default GenrePage
