import { ReactFCWithChildren } from '@/shared/props'
import styles from './Layout.module.scss'
import Navigation from './Navigation/Navigation'
const Layout : ReactFCWithChildren = ({children}) => {
  return (
    <div className={styles.layout}>
    <Navigation/>
    <div className={styles.center}>
        {children}
        {/* <MoviesContainer/> */}
    </div>
    </div>
  )
}

export default Layout