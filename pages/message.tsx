import {
  MessageDetail,
  Page,
  OneColumn,
  TwoColumns
} from '@glif/react-components'
import { useRouter } from 'next/router'
import { PAGE } from '../constants'
import SearchBar from '../src/components/SearchBar'

export default function Address() {
  const router = useRouter()
  const cid = router?.query?.cid
  return (
    <Page
      homeUrl={process.env.NEXT_PUBLIC_HOME_URL}
      blogUrl={process.env.NEXT_PUBLIC_BLOG_URL}
      walletUrl={process.env.NEXT_PUBLIC_WALLET_URL}
      safeUrl={process.env.NEXT_PUBLIC_SAFE_URL}
    >
      <TwoColumns>
        <div>
          <h2>Search for another address or a transaction hash</h2>
          <SearchBar />
        </div>
        <div></div>
      </TwoColumns>
      {cid && (
        <OneColumn>
          <MessageDetail
            cid={cid as string}
            addressHref={(address: string) =>
              `${PAGE.ACTOR}/?address=${address}`
            }
          />
        </OneColumn>
      )}
    </Page>
  )
}
