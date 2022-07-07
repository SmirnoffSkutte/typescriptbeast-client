import React, { FC, PropsWithChildren } from 'react'
import { ISeo } from './meta.interface'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { siteName, titleMerge } from 'config/seo.config'
import logoImage from '@/assets/images/pornhub.svg'
import { onlyText } from '../string/clearText'

const Meta:FC<PropsWithChildren<ISeo>>= ({children,title,description,image=null}) => {
    const {asPath} = useRouter()
    const currentUrl = `${process.env.APP_URL}${asPath}`
  return (
    <>
    <Head>
      <title itemProp='headline'>{titleMerge(title)}</title>
    {description ? (
      <>
      	<title itemProp='headline'>{titleMerge(title)}</title>
					<meta
						itemProp='description'
						name='description'
						content={onlyText(description, 99)}
					/>
          <meta name='robots' content='ALL'/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <meta name="rating" content="RTA-5042-1996-1400-1577-RTA" />
          <meta httpEquiv="Content-Language" content="ru"/>
          <meta name="keywords" content="фильмы,сериалы,смотреть фильмы и сериалы"/>
          <meta name="description" content="Дефолтное описание сайта"/>
					<link rel='canonical' href={currentUrl} />
					<meta property='og:locale' content='ru' />
					<meta property='og:title' content={titleMerge(title)} />
					<meta property='og:url' content={currentUrl} />
					<meta property='og:image' content={image || logoImage} />
					<meta property='og:site_name' content={siteName} />
					<meta
						property='og:description'
						content={onlyText(description, 99)}
					/>
      </>

    ):(
      <meta name='robots' content='noindex nofollow'/>
    )}
    </Head>
    {children}
    </>
  )
}

export default Meta