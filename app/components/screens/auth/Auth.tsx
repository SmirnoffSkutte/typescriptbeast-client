import { useAuth } from '@/hooks/useAuth'
import { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IAuthInput } from './auth-interface'
import { useAuthRedirect } from './useAuthRedirect'
import styles from './Auth.module.scss'
import Meta from '@/utils/meta/Meta'
import Heading from '@/components/ui/heading/Heading'
import Button from '@/components/ui/form-elements/Button'
import AuthFields from './AuthField'
import { useActions } from '@/hooks/useActions'
const Auth : FC = () => {
    useAuthRedirect()

    const {isLoading} = useAuth()

    const [type,setType]=useState<'login' | 'register'>('login')

    const {register:RegisterInput,handleSubmit,formState,reset}=useForm<IAuthInput>({
        mode:'onChange'
    })

    const {login,register}=useActions()


    const onSubmit:SubmitHandler<IAuthInput>=(data)=>{
        if(type==='login') login(data)
        else if(type==='register') register(data)
        reset()

    }
  return (
    <Meta title='Auth'>
        <section className={styles.wrapper}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Heading title='Авторизация' className='mb-6'></Heading>

                <AuthFields formState={formState} register={RegisterInput} isPasswordRequired/>

                <div className={styles.buttons}>
						<Button
							type="submit"
							onClick={() => setType('login')}
							disabled={isLoading}
						>
							Логин
						</Button>
						<Button
							type="submit"
							onClick={() => setType('register')}
							disabled={isLoading}
						>
							Регистрация
						</Button>
				</div>
            </form>

        </section>
    </Meta>
  )
}

export default Auth