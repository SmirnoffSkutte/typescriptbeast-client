import { FC } from 'react'

import GalleryItem from '@/components/ui/gallery/GalleryItem'
import Description from '../heading/Descsription'
import Heading from '@/components/ui/heading/Heading'

import Meta from '@/utils/meta/Meta'

import { getActorUrl} from 'config/url.config'

import styles from './Catalog.module.scss'
import { ICatalog } from './catalog.interface'

const ActorCatalog: FC<ICatalog> = ({ title, description, actors }) => {
	return (
		<Meta title={title} description={description}>
			<Heading title={title} className={styles.heading} />
			{description && (
				<Description text={description} className={styles.description} />
			)}

			<section className={styles.movies}>
				{actors.map((actor) => (
					<GalleryItem
						key={actor._id}
						variant="horizontal"
						item={{
							name: actor.name,
							posterPath: actor.photo,
							url: getActorUrl(actor.slug),
							content: {
								title: actor.name,
								subTitle: `${String(actor.countMovies)} видео`
							},
						}}
					/>
				))}
			</section>

			{/* <div className="text-center">
				<button className={styles.button}>Load more</button>
			</div> */}
		</Meta>
	)
}

export default ActorCatalog
