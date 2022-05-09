import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import { getActorUrl } from 'config/url.config'

import CollectionImage from './CollectionsImage'
import styles from './Collections.module.scss'
import { ICollection } from './collections.interface'

const CollectionItem: FC<{ collection: ICollection }> = ({ collection }) => {
	return (
		<Link href={getActorUrl(collection.slug)}>
			<a className={styles.collection}>
				<CollectionImage collection={collection} />

				<div className={styles.content}>
					<div className={styles.title}>{collection.title}</div>
				</div>
			</a>
		</Link>
	)
}

export default CollectionItem
