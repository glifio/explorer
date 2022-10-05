import '@glif/base-css'
import App from 'next/app'
import Head from 'next/head'
import Script from 'next/script'
import React from 'react'
import {
  ApolloWrapper,
  EnvironmentProvider,
  ErrorBoundary
} from '@glif/react-components'
import { SWRConfig } from 'swr'

import { ExplorerPage } from '../src/components/ExplorerPage'
import JSONLD from '../JSONLD'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <>
        <Head>
          <title>GLIF Explorer</title>
          <meta name='description' content='A Filecoin analytics UI.' />
          <meta
            name='keywords'
            content='Filecoin,Explorer,Web,Storage,Blockchain,Crypto,FIL'
          />
          <meta property='og:image' content='/bg-explorer.jpg' />
          <meta property='og:title' content='GLIF Explorer' />
          <meta property='og:description' content='A Filecoin analytics UI.' />
          <meta property='og:url' content='https://beta.explorer.glif.io' />
          <meta name='twitter:title' content='GLIF Wallet' />
          <meta name='twitter:description' content='A Filecoin analytics UI.' />
          <meta name='twitter:image' content='/bg-explorer.jpg' />
          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:creator' content='@glifio' key='twhandle' />
          <meta property='og:site_name' content='GLIF Explorer' />
          <meta name='twitter:image:alt' content='A Filecoin analytics UI.' />
          <link
            rel='icon'
            type='image/png'
            sizes='32x32'
            href='/static/favicon-32x32.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='16x16'
            href='/static/favicon-32x32.png'
          />
        </Head>
        <Script
          id='json-ld'
          type='application/ld+json'
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSONLD) }}
        />
        <EnvironmentProvider
          homeUrl={process.env.NEXT_PUBLIC_HOME_URL}
          blogUrl={process.env.NEXT_PUBLIC_BLOG_URL}
          walletUrl={process.env.NEXT_PUBLIC_WALLET_URL}
          safeUrl={process.env.NEXT_PUBLIC_SAFE_URL}
          explorerUrl={process.env.NEXT_PUBLIC_EXPLORER_URL}
          verifierUrl={process.env.NEXT_PUBLIC_VERIFIER_URL}
          nodeStatusApiUrl='https://api.uptimerobot.com/v2/getMonitors'
          isProd={false}
          sentryDsn={process.env.NEXT_PUBLIC_SENTRY_DSN}
          sentryEnv={process.env.NEXT_PUBLIC_SENTRY_ENV}
        >
          <ApolloWrapper>
            <SWRConfig value={{ refreshInterval: 10000 }}>
              <ErrorBoundary Wrapper={ExplorerPage}>
                <Component {...pageProps} />
              </ErrorBoundary>
            </SWRConfig>
          </ApolloWrapper>
        </EnvironmentProvider>
      </>
    )
  }
}

export default MyApp
