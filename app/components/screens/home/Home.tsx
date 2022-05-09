
import Meta from '@/utils/meta/Meta'
import { FC } from 'react'
import { IHome } from './home.interface'

const Home: FC<IHome> = () => {
  return (
    <Meta title='PornPredator'
    description='Лучший сайт клубнички в рунете'>
      {/* <Heading title='Видеос' className='text-white'></Heading> */}

    </Meta>  
  )
}

export default Home