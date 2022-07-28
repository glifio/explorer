import {
  getQueryParam,
  validateCID,
  MessageDetail,
  OneColumn,
  PageTitle
} from '@glif/react-components'
import { useRouter } from 'next/router'
import ExplorerPage from '../src/components/ExplorerPage'

export default function Message() {
  const router = useRouter()
  const cid = getQueryParam.string(router, 'cid')
  const hasCID = !!cid
  const validCID = hasCID && validateCID(cid)
  return (
    <ExplorerPage>
      {validCID ? (
        <OneColumn>
          <MessageDetail cid={cid} />
        </OneColumn>
      ) : hasCID ? (
        <OneColumn>
          <PageTitle>
            It seems like you&apos;re looking for an invalid message CID
          </PageTitle>
          <h3>&ldquo;{cid}&rdquo;</h3>
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
