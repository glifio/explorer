import {
  getQueryParam,
  validateCID,
  MessageDetail,
  OneColumn
} from '@glif/react-components'
import { useRouter } from 'next/router'
import ExplorerPage from '../src/components/ExplorerPage'
import SearchBar from '../src/components/SearchBar'

export default function Message() {
  const router = useRouter()
  const cid = getQueryParam.string(router, 'cid')
  const hasCID = !!cid
  const validCID = hasCID && validateCID(cid)
  return (
    <ExplorerPage>
      {hasCID && !validCID && (
        <OneColumn>
          <h2>
            It seems like you&apos;re looking for an invalid transaction:
            <br />
            {cid}
          </h2>
        </OneColumn>
      )}
      <OneColumn>
        <h3>Search for another address or transaction hash</h3>
        <SearchBar />
      </OneColumn>
      {validCID && (
        <OneColumn>
          <MessageDetail cid={cid} />
        </OneColumn>
      )}
    </ExplorerPage>
  )
}
