import { FC } from 'react'
import Logo from './Logo'
import MenuContainer from './MenuContainer/MenuContainer'
import styles from './Navigation.module.scss'
const Navigation:FC = () => {
  return (
    <div>

      <div className={styles.logo}>
        <Logo/>
      </div>
      
      <div className={styles.navigation}>
        <MenuContainer/>
      </div>

    </div>
  )
}

export default Navigation