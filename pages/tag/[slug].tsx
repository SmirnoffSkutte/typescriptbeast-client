// import { errorCatch } from 'api/api.helpers'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Tag from '@/components/screens/tag/Tag'
import { TagService } from '@/services/tag.service'
import { MovieService } from '@/services/movie.service'
import Error404 from '../404'
import { ITagPage } from '@/components/screens/tag/tag.types'
import { useEffect, useState } from 'react'
import { IMovie } from '@/shared/types/movie.types'


const TagPage: NextPage<ITagPage> = ({ tag, movies }) => {
	const [data,setData]=useState<IMovie[]>(movies)
	const [currentPage,setCurrentPage]=useState<number>(2)
	const [fetching,setFetching]=useState(false)
	useEffect(()=>{
		setCurrentPage(2)
		setData(movies)
	},[tag])
	useEffect(()=>{
		if(fetching){
		// console.log('fetching')
		MovieService.getByTags([tag._id],currentPage)
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
	return tag ? <Tag tag={tag} movies={data} /> : <Error404 />
}

export const getStaticPaths: GetStaticPaths = async () => {
	try {
		const { data: tags } = await TagService.getAll()
		const paths = tags.map((g) => ({
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
		const { data: tag } = await TagService.getBySlug(String(params?.slug))

		const { data: movies } = await MovieService.getByTags([tag._id],1)

		return {
			props: { movies, tag },
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

export default TagPage
