import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import logoImage from '@/assets/images/pornhub.svg'
import styles from './Navigation.module.scss'
const Logo:FC = () => {
  return (
      <Link href='/'>
          <a className={styles.logo}>
              <Image src={logoImage} width={250} height={34} alt='PornPredator' draggable={false}/>
          </a>   
      </Link>
  )
}

export default Logo