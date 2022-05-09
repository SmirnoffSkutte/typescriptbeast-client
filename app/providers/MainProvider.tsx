import Layout from '@/components/layout/Layout'
import React, { FC, PropsWithChildren } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Provider } from 'react-redux'
import ReduxToast from './ReduxToast'
import { store } from '@/store/store'
import HeadProvider from './headprovider/HeadProvider'
import AuthProvider from './AuthProvider/AuthProvider'
import { TypeComponentAuthFields } from '@/shared/types/auth.types'
const queryClient = new QueryClient ({
    defaultOptions:{
        queries:{
            refetchOnWindowFocus : false
        }
    }
})



const MainProvider : FC<PropsWithChildren<TypeComponentAuthFields>> = ({children,Component}) => {
  return (
    <HeadProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ReduxToast/>
            <AuthProvider Component={Component}>
              <Layout>
                {children}
               </Layout>
            </AuthProvider>
         <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Provider>
    </HeadProvider>
  )
}

export default MainProvider