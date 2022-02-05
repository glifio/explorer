import React, { useCallback, useEffect, useState } from 'react'
import {
  AppTile,
  Box,
  Footer,
  PhishingBanner,
  LandingPageContainer,
  LandingPageContentContainer,
  space,
  fontSize,
  H2,
  P,
  isMobileOrTablet,
  theme,
  useNetworkName,
  Input
} from '@glif/react-components'
import styled from 'styled-components'
import { useRouter } from 'next/router'

import {
  ResponsiveWalletTile,
  ConnectContentContainer,
  TextBox
} from './Helpers'
import { navigate } from '../../utils/urlParams'
import { PAGE } from '../../../constants'

const Form = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export default function Landing() {
  const router = useRouter()

  const { networkName } = useNetworkName(
    process.env.NEXT_PUBLIC_LOTUS_NODE_JSONRPC
  )

  return (
    <>
      <LandingPageContainer>
        <LandingPageContentContainer>
          <ResponsiveWalletTile phishingBannerClosed={closed}>
            <AppTile
              title={
                networkName && networkName !== 'Mainnet'
                  ? `Explorer (${networkName})`
                  : 'Explorer'
              }
              description='A Filecoin analytics UI.'
              imgSrc='/bg-explorer.jpg'
              imgSrcHover='/bg-explorer-hover.jpg'
              small={false}
              large
            />
          </ResponsiveWalletTile>
          <ConnectContentContainer
            style={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Box>
              <H2
                style={{
                  marginTop: 0,
                  marginBottom: '1em',
                  fontWeight: 'normal',
                  fontSize: fontSize('large'),
                  lineHeight: '1.3em'
                }}
              >
                Search
              </H2>
              <Form></Form>
              <Box mt={6}>
                <P
                  css={`
                    font-size: ${fontSize('default')};
                  `}
                >
                  Want to load this app directly from IPFS or Filecoin?
                  <br />
                  Check our{' '}
                  <a
                    href='https://github.com/glifio/explorer/releases'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    release page
                  </a>
                </P>

                <P
                  css={`
                    font-size: ${fontSize('default')};
                  `}
                >
                  Need help?
                  <br />
                  Open a{' '}
                  <a
                    href='https://github.com/glifio/explorer/issues/new/choose'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    GitHub issue
                  </a>{' '}
                  or hit us up on{' '}
                  <a
                    href='https://twitter.com/glifio'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Twitter
                  </a>
                </P>
              </Box>
            </Box>
          </ConnectContentContainer>
        </LandingPageContentContainer>
      </LandingPageContainer>
      <Footer />
    </>
  )
}
