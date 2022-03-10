import {
  ActorState,
  MessageHistoryTable,
  OneColumn
} from '@glif/react-components'
import { validateAddressString } from '@glif/filecoin-address'
import { useRouter } from 'next/router'
import { PAGE } from '../constants'
import ExplorerPage from '../src/components/ExplorerPage'
import SearchBar from '../src/components/SearchBar'
import { generateRouteWithRequiredUrlParams } from '../src/utils/urlParams'

export default function Actor() {
  const router = useRouter()
  const address = router?.query?.address
  const isString = typeof address === 'string'
  const validAddress = isString && validateAddressString(address)
  return (
    <ExplorerPage>
      {address && !validAddress && (
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
              cidHref={(cid: string, height?: string) =>
                generateRouteWithRequiredUrlParams({
                  pageUrl: PAGE.MESSAGE,
                  newQueryParams: { height, cid },
                  existingQParams: { ...router.query } as Record<
                    string,
                    string
                  >,
                  maintainQueryParams: false
                })
              }
            />
          </OneColumn>
        </>
      )}
    </ExplorerPage>
  )
}
