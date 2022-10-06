import styled from 'styled-components'
import { useRouter } from 'next/router'
import {
  navigate,
  Page,
  PageProps,
  IconExplorer,
  SearchAddressMessage,
  NetworkSelector
} from '@glif/react-components'

import { PAGE, GLIF_DISCORD } from '../../constants'

const SearchBarWrapper = styled.div`
  flex-basis: 40em;
`

export default function ExplorerPage({ children, ...rest }: PageProps) {
  const router = useRouter()

  return (
    <Page
      appIcon={<IconExplorer />}
      customHeaderComps={
        <SearchBarWrapper>
          <SearchAddressMessage
            hideErrorMessage
            onSearchAddress={(address) =>
              navigate(router, {
                pageUrl: PAGE.ACTOR,
                params: { address }
              })
            }
            onSearchMessage={(cid) =>
              navigate(router, {
                pageUrl: PAGE.MESSAGE,
                params: { cid }
              })
            }
          />
        </SearchBarWrapper>
      }
      connection={<NetworkSelector enableSwitching />}
      appHeaderLinks={[
        {
          title: 'Wallet',
          url: process.env.NEXT_PUBLIC_WALLET_URL
        },
        {
          title: 'Safe',
          url: process.env.NEXT_PUBLIC_SAFE_URL
        },
        {
          title: 'Blog',
          url: process.env.NEXT_PUBLIC_BLOG_URL
        },
        {
          title: 'Discord',
          url: GLIF_DISCORD
        }
      ]}
      {...rest}
    >
      {children}
    </Page>
  )
}

ExplorerPage.propTypes = {
  ...Page.propTypes
}
