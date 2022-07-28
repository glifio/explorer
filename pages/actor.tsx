import {
  appendQueryParams,
  getQueryParam,
  ActorState,
  MessageHistoryTable,
  OneColumn,
  PageTitle
} from '@glif/react-components'
import { validateAddressString } from '@glif/filecoin-address'
import { useRouter } from 'next/router'
import { PAGE } from '../constants'
import ExplorerPage from '../src/components/ExplorerPage'

export default function Actor() {
  const router = useRouter()
  const address = getQueryParam.string(router, 'address')
  const hasAddress = !!address
  const validAddress = hasAddress && validateAddressString(address)
  return (
    <ExplorerPage>
      {validAddress ? (
        <>
          <OneColumn>
            <ActorState address={address} />
          </OneColumn>
          <OneColumn>
            <MessageHistoryTable
              address={address}
              cidHref={(cid: string) =>
                appendQueryParams(PAGE.MESSAGE, { cid })
              }
              warnMissingData
            />
          </OneColumn>
        </>
      ) : hasAddress ? (
        <OneColumn>
          <PageTitle>
            It seems like you&apos;re looking for an invalid address
          </PageTitle>
          <h3>&ldquo;{address}&rdquo;</h3>
          <p>Enter another address or message CID in the search bar above</p>
        </OneColumn>
      ) : (
        <OneColumn>
          <PageTitle>
            Enter an address or message CID in the search bar above
          </PageTitle>
        </OneColumn>
      )}
    </ExplorerPage>
  )
}
