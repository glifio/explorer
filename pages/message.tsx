import { MessageDetail, OneColumn } from '@glif/react-components'
import { useRouter } from 'next/router'
import { PAGE } from '../constants'
import ExplorerPage from '../src/components/ExplorerPage'
import SearchBar from '../src/components/SearchBar'
import validateCID from '../src/utils/validateCID'

export default function Message() {
  const router = useRouter()
  const cid = router?.query?.cid
  const height = Number(router?.query?.height) || null
  const isString = typeof cid === 'string'
  const validCID = isString && validateCID(cid)
  return (
    <ExplorerPage>
      {!!cid && !validCID && (
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
            height={height}
            addressHref={(address: string) =>
              `${PAGE.ACTOR}/?address=${address}`
            }
          />
        </OneColumn>
      )}
    </ExplorerPage>
  )
}
