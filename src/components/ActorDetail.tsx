import {
  appendQueryParams,
  ActorState,
  MessageHistoryTable,
  OneColumn,
  PageTitle,
  useEnvironment,
  Network,
  isAddress
} from '@glif/react-components'
import styled from 'styled-components'
import { PAGE } from '../../constants'
import ExplorerPage from './ExplorerPage'

const Col = styled(OneColumn)`
  padding-top: var(--space-l);
`

export default function ActorDetail({ address }: ActorDetailProps) {
  const hasAddress = !!address
  const validAddress = hasAddress && isAddress(address)
  const { networkName } = useEnvironment()
  return (
    <ExplorerPage>
      {validAddress ? (
        <>
          <Col>
            <ActorState address={address} />
          </Col>
          <Col>
            <MessageHistoryTable
              address={address}
              txIDHref={(txID: string) =>
                appendQueryParams(PAGE.MESSAGE, { cid })
              }
              warnMissingData={networkName === Network.MAINNET}
            />
          </Col>
        </>
      ) : hasAddress ? (
        <Col>
          <PageTitle>
            It seems like you&apos;re looking for an invalid address
          </PageTitle>
          <h3>&ldquo;{address}&rdquo;</h3>
          <p>
            Enter another address, message CID, or transaction hash in the
            search bar above
          </p>
        </Col>
      ) : (
        <Col>
          <PageTitle>
            Enter an address, message CID, or transaction hash in the search bar
            above
          </PageTitle>
        </Col>
      )}
    </ExplorerPage>
  )
}

type ActorDetailProps = {
  address: string
}
