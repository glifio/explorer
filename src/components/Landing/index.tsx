import React, { useCallback, useState } from 'react'
import { CID } from 'multiformats/cid'
import {
  AppTile,
  Box,
  Footer,
  LandingPageContainer,
  LandingPageContentContainer,
  fontSize,
  Label,
  H2,
  P,
  useNetworkName,
  IconSearch,
  InputLabelBase,
  Button,
  Card,
  Input
} from '@glif/react-components'
import { validateAddressString } from '@glif/filecoin-address'
import styled from 'styled-components'
import { useRouter } from 'next/router'

import { ResponsiveWalletTile, ConnectContentContainer } from './Helpers'
import { navigate } from '../../utils/urlParams'
import { PAGE } from '../../../constants'

const Form = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`

export default function Landing() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [searchError, setSearchError] = useState('')

  const { networkName } = useNetworkName(
    process.env.NEXT_PUBLIC_LOTUS_NODE_JSONRPC
  )

  const onSubmit = useCallback(
    (e: SubmitEvent) => {
      e.preventDefault()
      setSearchError('')

      try {
        if (validateAddressString(searchTerm)) {
          navigate(router, { pageUrl: `${PAGE.ADDRESS}/${searchTerm}` })
          return
        } else if (CID.parse(searchTerm)) {
          navigate(router, { pageUrl: `${PAGE.MESSAGE}/${searchTerm}` })
          return
        }
      } catch {
        setSearchError('Invalid search')
      }
    },
    [setSearchError, router, searchTerm]
  )

  return (
    <>
      <LandingPageContainer>
        <LandingPageContentContainer>
          <ResponsiveWalletTile phishingBannerClosed>
            <AppTile
              title={
                networkName && networkName !== 'Mainnet'
                  ? `Explorer (${networkName})`
                  : 'Explorer'
              }
              description='A simple Filecoin analytics UI.'
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
                Search for an address or a transaction hash
              </H2>
              <Card
                p={0}
                border={0}
                width='100%'
                maxWidth={13}
                height={7}
                display='flex'
                flexDirection='column'
                justifyContent='space-between'
                boxShadow={2}
              >
                <Box
                  display='flex'
                  flexDirection='row'
                  justifyContent='space-between'
                  flexWrap='wrap'
                  height='100%'
                >
                  <Form onSubmit={onSubmit}>
                    <Box
                      position='relative'
                      display='flex'
                      alignItems='center'
                      height='100%'
                      width='100%'
                    >
                      <InputLabelBase
                        display='none'
                        htmlFor='check-fil-address'
                      />
                      <Input.Base
                        id='check-fil-address'
                        width='100%'
                        flexShrink='1'
                        pr={8}
                        pl={3}
                        height='100%'
                        overflow='scroll'
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value)
                        }}
                      />
                      {!searchTerm && (
                        <IconSearch position='absolute' left='3' />
                      )}
                      <Button
                        position='absolute'
                        right='0'
                        type='submit'
                        title='Search'
                        variant='secondary'
                        mx={2}
                        px={4}
                        disabled={!searchTerm}
                        bg='transparent'
                      />
                    </Box>
                  </Form>
                </Box>
              </Card>
              <Label color='status.fail.background' ml={2} mt={4}>
                {searchError}
              </Label>

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
