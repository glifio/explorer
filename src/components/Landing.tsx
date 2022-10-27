import { useRouter } from 'next/router'
import {
  navigate,
  AppTile,
  LandingPageColumns,
  LandingPageContent,
  Page,
  SmartLink,
  SearchAddressMessage,
  Network,
  useEnvironment
} from '@glif/react-components'

import { PAGE } from '../../constants'

export default function Landing() {
  const router = useRouter()
  const { networkName } = useEnvironment()

  return (
    <Page hideAppHeader>
      <LandingPageColumns>
        <AppTile
          title={
            networkName && networkName !== Network.MAINNET
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
          <h2>Search for an address, message CID, or transaction hash</h2>
          <SearchAddressMessage
            large
            onSearchAddress={(address) =>
              navigate(router, {
                pageUrl: `${PAGE.ADDRESS}/${address}`
              })
            }
            onSearchMessage={(txID) =>
              navigate(router, {
                pageUrl: `${PAGE.TX}/${txID}`
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
