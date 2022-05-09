import { FC, useEffect, useRef, useState } from 'react'
import AuthItems from './auth/AuthItems'
import { IMenu } from './menu.interface'
import styles from './Menu.module.scss'
import MenuItem from './MenuItem'

const Menu:FC<{menu:IMenu}> = ({menu:{items,title}}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [opened,setOpened]=useState(false)
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);
  const handleClickOutside = (event:MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target as HTMLDivElement)) {
      setOpened(false);
    }
  };
  const f=()=>{
    setOpened(!opened)
  }
  return (
    <div className={styles.menu} ref={wrapperRef}>
        <div onClick={f} className={styles.heading}>{title}</div>
        <ul className={styles.menuItem}>
        {title === 'Профиль' ? 
            <ul className={styles.menuItem}>
              <div className={opened ? styles.submenu : styles.none}>
                <AuthItems/>
              </div>
            </ul>    
          : <div className={opened ? styles.submenu : styles.none}>
          {items.map(item=>(
              <MenuItem item={item} key={item.link}/>
          ))}
          </div>}
        </ul>
        
    </div>
  )
}

export default Menu