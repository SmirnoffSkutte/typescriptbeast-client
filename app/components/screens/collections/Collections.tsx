import { FC } from 'react'

import Description from '@/components/ui/heading/Descsription'
import Heading from '@/components/ui/heading/Heading'
import CollectionItem from './CollectionItem'
import Meta from '@/utils/meta/Meta'
import GalleryItem from '@/components/ui/gallery/GalleryItem'
import styles from './Collections.module.scss'
import { ICollection } from './collections.interface'


const title = 'Актеры'
const description = 'Поиск актеров'

const Collections: FC<{ collections: ICollection[] }> = ({ collections }) => {
	return (
		<Meta title={title} description={description}>
			<Heading title={title} className={styles.heading} />
			<Description text={description} className={styles.description} />

			<section className={styles.collections}>
            {collections.map((collection) => (
					<CollectionItem key={collection._id} collection={collection} />
				))}
			</section>
		</Meta>
	)
}

export default Collections

