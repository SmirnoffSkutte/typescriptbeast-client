import { FC } from 'react'

import GalleryItem from '@/components/ui/gallery/GalleryItem'
import Heading from '@/components/ui/heading/Heading'
import { getMovieUrl } from 'config/url.config'

import styles from './Catalog.module.scss'
import { ICatalog } from './catalog.interface'

const CatalogNoMeta: FC<ICatalog> = ({ title , movies }) => {
	return (
        <>
			<Heading title={title} className={styles.heading} />
			<section className={styles.movies}>
				{movies.map((movie) => (
					<GalleryItem
						key={movie._id}
						variant="horizontal"
						item={{
							name: movie.title,
							posterPath: movie.poster || '',
							url: getMovieUrl(movie.slug),
							content: {
								title: movie.title,
								subTitle:`👁 ${movie.countOpened}`
							},
						}}
					/>
				))}
			</section>
        </>
	)
}

export default CatalogNoMeta
