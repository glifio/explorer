import '@glif/base-css'
import App from 'next/app'
import Head from 'next/head'
import Script from 'next/script'
import React from 'react'
import { theme, ThemeProvider } from '@glif/react-components'
import { ApolloProvider } from '@apollo/client'
import { SWRConfig } from 'swr'

import { createApolloClient } from '../apolloClient'
import ErrorBoundary from '../src/components/ErrorBoundary'
import JSONLD from '../JSONLD'

const apolloClient = createApolloClient()

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
        <ApolloProvider client={apolloClient}>
          <SWRConfig value={{ refreshInterval: 10000 }}>
            <ThemeProvider theme={theme}>
              <ErrorBoundary>
                <Component {...pageProps} />
              </ErrorBoundary>
            </ThemeProvider>
          </SWRConfig>
        </ApolloProvider>
      </>
    )
  }
}

export default MyApp
