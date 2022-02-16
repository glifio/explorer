import React, { FormEvent, useCallback, useState } from 'react'
import { CID } from 'multiformats/cid'
import {
  AppHeader,
  AppTile,
  Box,
  Footer,
  LandingPageOuter,
  LandingPageInner,
  LandingPageAppTile,
  LandingPageContent,
  Label,
  P,
  useNetworkName,
  IconSearch,
  InputLabelBase,
  Button,
  Input,
  SmartLink
} from '@glif/react-components'
import { validateAddressString } from '@glif/filecoin-address'
import { useRouter } from 'next/router'

import { navigate } from '../../utils/urlParams'
import { PAGE } from '../../../constants'

export default function Landing() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [searchError, setSearchError] = useState('')

  const { networkName } = useNetworkName(
    process.env.NEXT_PUBLIC_LOTUS_NODE_JSONRPC
  )

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      setSearchError('')

      const search = searchTerm.trim()

      try {
        if (validateAddressString(search)) {
          navigate(router, {
            pageUrl: PAGE.ACTOR,
            newQueryParams: { address: search }
          })
          return
        } else if (CID.parse(searchTerm)) {
          navigate(router, {
            pageUrl: PAGE.MESSAGE,
            newQueryParams: {
              cid: search
            }
          })
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
      <LandingPageOuter>
        <AppHeader
          homeUrl={process.env.NEXT_PUBLIC_HOME_HREF}
          blogUrl={process.env.NEXT_PUBLIC_BLOG_HREF}
          walletUrl={process.env.NEXT_PUBLIC_WALLET_HREF}
          safeUrl={process.env.NEXT_PUBLIC_SAFE_HREF}
        />
        <LandingPageInner>
          <LandingPageAppTile>
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
          </LandingPageAppTile>
          <LandingPageContent>
            <h2>Search for an address or a transaction hash</h2>

            <form onSubmit={onSubmit}>
              <Box
                display='flex'
                alignItems='center'
                position='relative'
                overflow='hidden'
                maxWidth={13}
                boxShadow={2}
                borderRadius={2}
              >
                <InputLabelBase display='none' htmlFor='check-fil-address' />
                <Input.Base
                  id='check-fil-address'
                  pr={8}
                  pl={4}
                  height={7}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {!searchTerm && <IconSearch position='absolute' left={4} />}
                <Button
                  position='absolute'
                  right={2}
                  px={4}
                  bg='transparent'
                  type='submit'
                  title='Search'
                  variant='secondary'
                  disabled={!searchTerm}
                />
              </Box>
            </form>

            {searchError && (
              <Label color='status.fail.background' ml={2} mt={4}>
                {searchError}
              </Label>
            )}

            <Box mt={6} fontSize='1.125rem'>
              <P>
                Want to load this app directly from IPFS or Filecoin?
                <br />
                Check our&nbsp;
                <SmartLink href='https://github.com/glifio/explorer/releases'>
                  release page
                </SmartLink>
              </P>
              <P>
                Need help?
                <br />
                Open a&nbsp;
                <SmartLink href='https://github.com/glifio/explorer/issues/new/choose'>
                  GitHub issue
                </SmartLink>
                &nbsp;or hit us up on&nbsp;
                <SmartLink href='https://twitter.com/glifio'>Twitter</SmartLink>
              </P>
            </Box>
          </LandingPageContent>
        </LandingPageInner>
      </LandingPageOuter>
      <Footer />
    </>
  )
}
