import { GetStaticProps, NextPage } from 'next'
import { IActor} from '@/shared/types/movie.types'
import { ActorService } from '@/services/actor.service'
import ActorCatalog from '@/components/ui/catalog-actors/Catalog'
import SearchActors from '@/components/layout/Search/SearchActors'
import { useEffect, useState } from 'react'

const ActorsPage: NextPage<{ actors: IActor[] }> = ({ actors }) => {
	const [data,setData]=useState(actors)
	const [currentPage,setCurrentPage]=useState(2)
	const [fetching,setFetching]=useState(false)
	useEffect(()=>{
		if(fetching){
		console.log('fetching')
		ActorService.getAll(currentPage)
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
	return (
		
		<>
		<SearchActors/>
		<ActorCatalog
			actors={data || []}
			title="Актеры"
			description="Актеры на typescriptbeast.ru"
		/>
		</>
	)
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const { data: actors } = await ActorService.getAll(1)

		return {
			props: { actors },
			revalidate:60,
		}
	} catch (e) {
		// console.log(errorCatch(e))

		return {
			notFound: true,
		}
	}
}

export default ActorsPage
