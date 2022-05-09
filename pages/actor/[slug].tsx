import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import Actor from '@/screens/actor/Actor'

import { IActorPage } from '@/components/screens/actor/actor.types'
import { ActorService } from '@/services/actor.service'
import { MovieService } from '@/services/movie.service'

import Error404 from '../404'
import { useEffect, useState } from 'react'

const ActorPage: NextPage<IActorPage> = ({ actor, movies }) => {
	const [data,setData]=useState(movies)
	const [currentPage,setCurrentPage]=useState(2)
	const [fetching,setFetching]=useState(false)
	useEffect(()=>{
		if(fetching){
		// console.log('fetching')
		MovieService.getByActor(currentPage,actor._id)
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
	return actor ? <Actor actor={actor} movies={data} /> : <Error404 />
}

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: actors } = await ActorService.getAllNoPages()
		const paths = actors.map((g) => ({
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
		const { data: actor } = await ActorService.getBySlug(String(params?.slug))

		const { data: movies } = await MovieService.getByActor(1,actor._id)

		return {
			props: { movies, actor },
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

export default ActorPage
