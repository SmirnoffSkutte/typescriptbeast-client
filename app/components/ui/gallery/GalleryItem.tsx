import cn from 'classnames'
import Link from 'next/link'
import { FC, useEffect } from 'react'
import styles from './Gallery.module.scss'
import { IGalleryItemProps } from './gallery.interface'
import Image from 'next/image'
import noneImg from '../../../assets/images/none.jpg'

const GalleryItem: FC<IGalleryItemProps> = ({ item, variant }) => {
	// let isLoaded=false
	// const [image,setImage]=useState('')
	
	return (
		<Link href={item.url}>
			<a
				className={cn(styles.item, {
					[styles.withText]: item.content,
					[styles.horizontal]: variant === 'horizontal',
					[styles.vertical]: variant === 'vertical',
				})}
			>
				{item.content && (
					<div className={styles.subTitleBlock}>
						<div className={styles.subTitle}><div className={styles.subcont}>{item.content.subTitle}</div></div>
						<div className={styles.time}><div className={styles.subtime}>{item.content.duration}</div></div>
					</div>
				)}
				
				<Image alt={item.name} src={item.posterPath || noneImg} draggable={false} layout='fill' objectFit='fill' priority/>
				
				

				{item.content && (
					<div className={styles.content}>
						{item.content.title}
					</div>
				)}
			</a>
		</Link>
	)
}

export default GalleryItem
