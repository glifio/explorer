import {
  validateCID,
  MessageDetail as MessageDetailComp,
  OneColumn,
  PageTitle
} from '@glif/react-components'
import { isHexString } from '../utils'
import ExplorerPage from './ExplorerPage'

export function MessageDetail({ txID }: MessageProps) {
  const hasTxID = !!txID
  const validTxID = hasTxID && (validateCID(txID) || isHexString(txID))
  return (
    <ExplorerPage>
      {validTxID ? (
        <OneColumn>
          <MessageDetailComp txID={txID} />
        </OneColumn>
      ) : hasTxID ? (
        <OneColumn>
          <PageTitle>
            It seems like you&apos;re looking for an invalid message CID or
            transaction hash
          </PageTitle>
          <h3>&ldquo;{txID}&rdquo;</h3>
          <p>
            Enter another address, message CID or transaction hash in the
            search bar above
          </p>
        </OneColumn>
      ) : (
        <OneColumn>
          <PageTitle>
            Enter an address, message CID or tx hash in the search bar above
          </PageTitle>
        </OneColumn>
      )}
    </ExplorerPage>
  )
}

type MessageProps = {
  txID: string
}
