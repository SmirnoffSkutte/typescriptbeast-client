import  { FC } from 'react'
import TagMenu from './tags/TagMenu'
import GenreMenu from './genres/GenreMenu'
import Menu from './Menu'
import {userMenu} from './menu.data'
import styles from './Menu.module.scss'
import Link from 'next/link'

const MenuContainer:FC = () => {
  return (
    <div className={styles.menusFlex}>
      <Menu menu={userMenu}/>
      <TagMenu/>
      <GenreMenu/>
      <Link href={`/actorsPage`}>
        <a className={styles.actor}>Актеры</a>
      </Link>
    </div>
  )
}

export default MenuContainer