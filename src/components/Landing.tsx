import { useRouter } from 'next/router'
import {
  navigate,
  AppTile,
  LandingPageColumns,
  LandingPageContent,
  Page,
  SmartLink,
  SearchAddressMessage,
  useNetworkName
} from '@glif/react-components'

import { PAGE } from '../../constants'

export default function Landing() {
  const router = useRouter()
  const { networkName } = useNetworkName(
    process.env.NEXT_PUBLIC_LOTUS_NODE_JSONRPC
  )

  return (
    <Page hideAppHeader>
      <LandingPageColumns>
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
        <LandingPageContent>
          <h2>Search for an address or a message CID</h2>
          <SearchAddressMessage
            large
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
          <p>
            Want to load this app directly from IPFS or Filecoin?
            <br />
            Check our&nbsp;
            <SmartLink href='https://github.com/glifio/explorer/releases'>
              release page
            </SmartLink>
          </p>
          <p>
            Need help?
            <br />
            Open a&nbsp;
            <SmartLink href='https://github.com/glifio/explorer/issues/new/choose'>
              GitHub issue
            </SmartLink>
            &nbsp;or hit us up on&nbsp;
            <SmartLink href='https://twitter.com/glifio'>Twitter</SmartLink>
          </p>
        </LandingPageContent>
      </LandingPageColumns>
    </Page>
  )
}
