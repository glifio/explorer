import { OneColumnCentered } from '@glif/react-components'
import { WagmiConfig, createClient, configureChains, chain } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'

import ExplorerPage from '../src/components/ExplorerPage'
import { Ethereum } from '../src/components/Ethereum'

const { provider, webSocketProvider } = configureChains(
  [chain.mainnet],
  [publicProvider()]
)

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider
})

export default function DelegatedAddrs() {
  return (
    <WagmiConfig client={client}>
      <ExplorerPage>
        <OneColumnCentered>
          <Ethereum />
        </OneColumnCentered>
      </ExplorerPage>
    </WagmiConfig>
  )
}
