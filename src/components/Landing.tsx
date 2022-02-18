import {
  AppTile,
  LandingPageColumns,
  LandingPageContent,
  Page,
  SmartLink,
  useNetworkName
} from '@glif/react-components'
import SearchBar from './SearchBar'

export default function Landing() {
  const { networkName } = useNetworkName(
    process.env.NEXT_PUBLIC_LOTUS_NODE_JSONRPC
  )

  return (
    <Page
      homeUrl={process.env.NEXT_PUBLIC_HOME_URL}
      blogUrl={process.env.NEXT_PUBLIC_BLOG_URL}
      walletUrl={process.env.NEXT_PUBLIC_WALLET_URL}
      safeUrl={process.env.NEXT_PUBLIC_SAFE_URL}
    >
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
          <h2>Search for an address or a transaction hash</h2>
          <SearchBar />
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
