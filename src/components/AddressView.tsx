import {
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

export const AddressView = ({ address }: AddressViewProps) => {
  const hasAddress = !!address
  const validAddress = hasAddress && isAddress(address)
  const { networkName } = useEnvironment()
  return (
    <ExplorerPage>
      {validAddress ? (
        <>
          <OneColumn>
            <ActorState address={address} />
          </OneColumn>
          <OneColumn>
            <MessageHistoryTable
              address={address}
              txIDHref={(txID: string) => `${PAGE.TX}/${txID}`}
              warnMissingData={networkName === Network.MAINNET}
            />
          </OneColumn>
        </>
      ) : hasAddress ? (
        <OneColumn>
          <PageTitle>
            It seems like you&apos;re looking for an invalid address
          </PageTitle>
          <h3>&ldquo;{address}&rdquo;</h3>
          <p>
            Enter another address, message CID, or transaction hash in the
            search bar above
          </p>
        </OneColumn>
      ) : (
        <OneColumn>
          <PageTitle>
            Enter an address, message CID, or transaction hash in the search bar
            above
          </PageTitle>
        </OneColumn>
      )}
    </ExplorerPage>
  )
}

type AddressViewProps = {
  address: string
}
