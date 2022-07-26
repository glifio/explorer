import {
  getQueryParam,
  validateCID,
  MessageDetail,
  OneColumn
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
      {hasCID && !validCID && (
        <OneColumn>
          <h2>
            It seems like you&apos;re looking for an invalid transaction:
            <br />
            {cid}
          </h2>
        </OneColumn>
      )}
      {validCID && (
        <OneColumn>
          <MessageDetail cid={cid} />
        </OneColumn>
      )}
    </ExplorerPage>
  )
}
