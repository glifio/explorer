import {
  validateCID,
  MessageDetail as MessageDetailComp,
  OneColumn,
  PageTitle
} from '@glif/react-components'
import { utils } from 'ethers'
import ExplorerPage from './ExplorerPage'

export function MessageDetail({ cidOrTxHash }: MessageProps) {
  const hasCIDOrTxHash = !!cidOrTxHash
  const validCIDHash =
    hasCIDOrTxHash &&
    (validateCID(cidOrTxHash) || utils.isHexString(cidOrTxHash))
  return (
    <ExplorerPage>
      {validCIDHash ? (
        <OneColumn>
          <MessageDetailComp cid={cidOrTxHash} />
        </OneColumn>
      ) : hasCIDOrTxHash ? (
        <OneColumn>
          <PageTitle>
            It seems like you&apos;re looking for an invalid message CID or tx
            hash
          </PageTitle>
          <h3>&ldquo;{cidOrTxHash}&rdquo;</h3>
          <p>
            Enter another address, message CID, or tx hash in the search bar
            above
          </p>
        </OneColumn>
      ) : (
        <OneColumn>
          <PageTitle>
            Enter an address, message CID, or tx hash in the search bar above
          </PageTitle>
        </OneColumn>
      )}
    </ExplorerPage>
  )
}

type MessageProps = {
  cidOrTxHash: string
}
