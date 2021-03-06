import {
  appendQueryParams,
  getQueryParam,
  ActorState,
  MessageHistoryTable,
  OneColumn
} from '@glif/react-components'
import { validateAddressString } from '@glif/filecoin-address'
import { useRouter } from 'next/router'
import { PAGE } from '../constants'
import ExplorerPage from '../src/components/ExplorerPage'
import SearchBar from '../src/components/SearchBar'

export default function Actor() {
  const router = useRouter()
  const address = getQueryParam.string(router, 'address')
  const hasAddress = !!address
  const validAddress = hasAddress && validateAddressString(address)
  return (
    <ExplorerPage>
      {hasAddress && !validAddress && (
        <OneColumn>
          <h2>
            It seems like you&apos;re looking for an invalid address:
            <br />
            {address}
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
      )}
    </ExplorerPage>
  )
}
