import {
  MessageDetail,
  OneColumn,
  PageTitle,
  isTxID
} from '@glif/react-components'
import ExplorerPage from './ExplorerPage'

export function TxView({ txID }: TxViewProps) {
  const hasTxID = !!txID
  const validTxID = hasTxID && isTxID(txID)
  return (
    <ExplorerPage>
      <OneColumn>
        {validTxID ? (
          <MessageDetail txID={txID} />
        ) : hasTxID ? (
          <>
            <PageTitle>
              It seems like you&apos;re looking for an invalid message CID or
              transaction hash
            </PageTitle>
            <h3>&ldquo;{txID}&rdquo;</h3>
            <p>
              Enter another address, message CID or transaction hash in the
              search bar above
            </p>
          </>
        ) : (
          <PageTitle>
            Enter an address, message CID or tx hash in the search bar above
          </PageTitle>
        )}
      </OneColumn>
    </ExplorerPage>
  )
}

type TxViewProps = {
  txID: string
}
