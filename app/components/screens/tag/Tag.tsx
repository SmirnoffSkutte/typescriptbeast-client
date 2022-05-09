import { FC } from 'react'
import { ITagPage } from './tag.types'
import Catalog from '@/components/ui/catalog-movies/Catalog'

const Tag: FC<ITagPage> = ({ tag, movies }) => {
	return (
		<Catalog
			movies={movies}
			title={tag.name}
			description={tag.description}
		/>
	)
}

export default Tag
