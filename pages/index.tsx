import Home from '@/components/screens/home/Home'
import styles from '../styles/Home.module.css'
import { GetStaticProps, NextPage } from 'next'
import Catalog from '@/components/ui/catalog-movies/Catalog'
import {  IMovie } from '@/shared/types/movie.types'

import { MovieService } from '@/services/movie.service'
import { useEffect, useState } from 'react'
import Meta from '@/utils/meta/Meta'
import Search from '@/components/layout/Search/Search'


const HomePage: NextPage<{ movies: IMovie[] }> = ({ movies}) => {
	const [data,setData]=useState(movies)
	const [currentPage,setCurrentPage]=useState(2)
	const [fetching,setFetching]=useState(false)
	const [contL,setContL]=useState(10)
	const [stopState,setStopsState]=useState(false)
	const scrollHandler = (e:any) => {
		if((e.target.documentElement.scrollHeight-(e.target.documentElement.scrollTop+window.innerHeight)<100) && (stopState===false)){
			setFetching(true)
		}
	}
	useEffect(()=>{
		document.addEventListener('scroll',scrollHandler)

		return function () {
			document.removeEventListener('scroll',scrollHandler)
		}
	},[])
	
	useEffect(()=>{
		if(fetching===true){
		// console.log('fetching')
		MovieService.getMovies(currentPage)
		.then(res=>{
			setData([...data,...res.data])
			setCurrentPage(prevState=>prevState+1)
			setContL(Number(res.headers['content-length']))
			if (contL < 3){
				setStopsState(true)
			}
		})
		.finally(()=>setFetching(false))
	}
	},[fetching])
	return (
		<Meta title="Новые фильмы" description='Новые фильмы'>
		<div>
		<Search></Search>
		<Catalog
			movies={data || []}
			title="Новые фильмы"
			description=""
		/>
		</div>
		</Meta>
	)
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const page = 1
		const { data: movies } = await MovieService.getMovies(1)
		
		useEffect

		return {
			props: { movies},
			revalidate:60,
		}
	} catch (e) {
		// console.log(errorCatch(e))

		return {
			notFound: true,
		}
	}
}

export default HomePage
