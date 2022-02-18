import { MessageDetail, Page, OneColumn } from '@glif/react-components'
import { useRouter } from 'next/router'
import { PAGE } from '../constants'
import SearchBar from '../src/components/SearchBar'
import validateCID from '../src/utils/validateCID'

export default function Address() {
  const router = useRouter()
  const cid = router?.query?.cid
  const isString = typeof cid === 'string'
  const validCID = isString && validateCID(cid)
  return (
    <Page
      homeUrl={process.env.NEXT_PUBLIC_HOME_URL}
      blogUrl={process.env.NEXT_PUBLIC_BLOG_URL}
      walletUrl={process.env.NEXT_PUBLIC_WALLET_URL}
      safeUrl={process.env.NEXT_PUBLIC_SAFE_URL}
    >
      {!validCID && (
        <OneColumn>
          <h2>
            It seems like you&apos;re looking for an invalid transaction
            {cid && isString && (
              <>
                :<br />
                {cid}
              </>
            )}
          </h2>
        </OneColumn>
      )}
      <OneColumn>
        <h3>Search for another address or transaction hash</h3>
        <SearchBar />
      </OneColumn>
      {validCID && (
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
