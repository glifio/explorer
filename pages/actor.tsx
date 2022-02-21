import {
  ActorState,
  MessageHistoryTable,
  Page,
  OneColumn
} from '@glif/react-components'
import { validateAddressString } from '@glif/filecoin-address'
import { useRouter } from 'next/router'
import { PAGE } from '../constants'
import SearchBar from '../src/components/SearchBar'

export default function Actor() {
  const router = useRouter()
  const address = router?.query?.address
  const isString = typeof address === 'string'
  const validAddress = isString && validateAddressString(address)
  return (
    <Page
      homeUrl={process.env.NEXT_PUBLIC_HOME_URL}
      blogUrl={process.env.NEXT_PUBLIC_BLOG_URL}
      walletUrl={process.env.NEXT_PUBLIC_WALLET_URL}
      safeUrl={process.env.NEXT_PUBLIC_SAFE_URL}
    >
      {!validAddress && (
        <OneColumn>
          <h2>
            It seems like you&apos;re looking for an invalid address
            {address && isString && (
              <>
                :<br />
                {address}
              </>
            )}
          </h2>
        </OneColumn>
      )}
      <OneColumn>
        <h3>Search for another address or transaction hash</h3>
        <SearchBar />
      </OneColumn>
      {validAddress && (
        <>
          <OneColumn>
            <ActorState address={address as string} />
          </OneColumn>
          <OneColumn>
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
