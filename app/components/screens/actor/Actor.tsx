import { FC } from 'react'

import Catalog from '@/components/ui/catalog-movies/Catalog'

import { IActorPage } from './actor.types'

const Actor: FC<IActorPage> = ({ actor, movies }) => {
	return <Catalog movies={movies} description={`Фильмы с ${actor.name} на typescriptbeast.ru`} title={actor.name} />
}

export default Actor
