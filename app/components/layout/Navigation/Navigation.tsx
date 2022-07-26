import { FC } from 'react'
import Logo from './Logo'
import MenuContainer from './MenuContainer/MenuContainer'
import styles from './Navigation.module.scss'
const Navigation:FC = () => {
  return (
    <nav>

      <div className={styles.logo}>
        <Logo/>
      </div>
      
      <div className={styles.navigation}>
        <MenuContainer/>
      </div>

    </nav>
  )
}

export default Navigation