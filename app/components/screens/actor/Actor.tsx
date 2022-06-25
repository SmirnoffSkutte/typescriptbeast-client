import { FC } from 'react'

import Catalog from '@/components/ui/catalog-movies/Catalog'

import { IActorPage } from './actor.types'

const Actor: FC<IActorPage> = ({ actor, movies }) => {
	return <Catalog movies={movies} description={`Порно с ${actor.name} на PornPredator`} title={actor.name} />
}

export default Actor
