import { IActor} from '@/shared/types/movie.types'
import { getActorUrl} from 'config/url.config'
import Link from 'next/link'
import { FC } from 'react'
import styles from './SearchList.module.scss'
import Image from 'next/image'
const ActorSearchList : FC<{actors:IActor[]}> = ({actors}) => {
  return (
    <div className={styles.list}>
        {actors.length ? actors.map(actor=>(
            <Link key={actor._id} href={getActorUrl(actor.slug)}>
            <a>
                <Image
								src={actor.photo || ''}
								width={50}
								height={50}
								objectFit="cover"
								objectPosition="top"
								alt={actor.name}
								draggable={false}
							  />
                <span>{actor.name}</span>
            </a>
            </Link>
        )) : <div className='text-white text-center my-4'>Актеры не найдены</div>
        }
    </div>
  )
}

export default ActorSearchList