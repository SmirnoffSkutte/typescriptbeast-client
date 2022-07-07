
import Meta from '@/utils/meta/Meta'
import { FC } from 'react'
import { IHome } from './home.interface'

const Home: FC<IHome> = () => {
  return (
    <Meta title='typescriptbeast.ru'
    description='Лучший онлайн-кинотеатр'>
      {/* <Heading title='Видеос' className='text-white'></Heading> */}

    </Meta>  
  )
}

export default Home