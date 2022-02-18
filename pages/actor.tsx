import {
  ActorState,
  MessageHistoryTable,
  Page,
  OneColumn,
  TwoColumns
} from '@glif/react-components'
import { useRouter } from 'next/router'
import { PAGE } from '../constants'
import SearchBar from '../src/components/SearchBar'

export default function Address() {
  const router = useRouter()
  const address = router?.query?.address
  return (
    <Page
      homeUrl={process.env.NEXT_PUBLIC_HOME_URL}
      blogUrl={process.env.NEXT_PUBLIC_BLOG_URL}
      walletUrl={process.env.NEXT_PUBLIC_WALLET_URL}
      safeUrl={process.env.NEXT_PUBLIC_SAFE_URL}
    >
      {address && (
        <>
          <TwoColumns>
            <div>
              <h2>Search for another address or a transaction hash</h2>
              <SearchBar />
            </div>
            <div></div>
          </TwoColumns>
          <OneColumn>
            <ActorState address={address as string} />
            <MessageHistoryTable
              address={address as string}
              addressHref={(address: string) =>
                `${PAGE.ACTOR}/?address${address}`
              }
              cidHref={(cid: string) => `${PAGE.MESSAGE}/?cid=${cid}`}
            />
          </OneColumn>
        </>
      )}
    </Page>
  )
}
