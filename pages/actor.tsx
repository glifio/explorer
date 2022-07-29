import {
  appendQueryParams,
  getQueryParam,
  ActorState,
  MessageHistoryTable,
  OneColumn,
  PageTitle
} from '@glif/react-components'
import styled from 'styled-components'
import { validateAddressString } from '@glif/filecoin-address'
import { useRouter } from 'next/router'
import { PAGE } from '../constants'
import ExplorerPage from '../src/components/ExplorerPage'

const Col = styled(OneColumn)`
  padding-top: var(--space-l);
`

export default function Actor() {
  const router = useRouter()
  const address = getQueryParam.string(router, 'address')
  const hasAddress = !!address
  const validAddress = hasAddress && validateAddressString(address)
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
              cidHref={(cid: string) =>
                appendQueryParams(PAGE.MESSAGE, { cid })
              }
              warnMissingData
            />
          </Col>
        </>
      ) : hasAddress ? (
        <Col>
          <PageTitle>
            It seems like you&apos;re looking for an invalid address
          </PageTitle>
          <h3>&ldquo;{address}&rdquo;</h3>
          <p>Enter another address or message CID in the search bar above</p>
        </Col>
      ) : (
        <Col>
          <PageTitle>
            Enter an address or message CID in the search bar above
          </PageTitle>
        </Col>
      )}
    </ExplorerPage>
  )
}
