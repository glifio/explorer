import {
  ButtonV2,
  LabeledText,
  Lines,
  SearchBar,
  StandardBox
} from '@glif/react-components'
import styled from 'styled-components'
import { useState } from 'react'
import { useAccount, useConnect } from 'wagmi'

const AddressWrapper = styled.span`
  > * {
    text-align: left;
  }
`

const P = styled.p`
  text-align: center;
`

export function Ethereum() {
  const { address } = useAccount()
  const { connect, connectors } = useConnect()
  const [convertedAddrs, setConvertedAddrs] = useState<
    {
      eth: string
      f4: string
    }[]
  >(null)

  const onSearch = (address) => {
    setConvertedAddrs((addrs) => {
      const newEntry = { eth: address, f4: `f410${address}` }
      if (!addrs) return [newEntry]
      return [newEntry, ...addrs]
    })
  }
  return (
    <>
      <h3>Convert an Ethereum address to its Filecoin equivalent</h3>
      <Lines>
        {!!address ? (
          <ButtonV2 large disabled onClick={() => {}}>
            Wallet connected
          </ButtonV2>
        ) : (
          <ButtonV2
            large
            green
            onClick={() => connect({ connector: connectors[0] })}
          >
            Connect Wallet
          </ButtonV2>
        )}
        <P>Or</P>
        <SearchBar
          large
          buttonText='Convert'
          onSearch={onSearch}
          placeholder='0x...'
        />
        <StandardBox>
          {!!address && (
            <AddressWrapper>
              <LabeledText label='Eth address (from MetaMask)' text={address} />
              <LabeledText
                label='Fil address (from MetaMask)'
                text={`f410f${address}`}
              />
            </AddressWrapper>
          )}
          <br />
          {!!convertedAddrs &&
            convertedAddrs.map(({ eth, f4 }) => {
              return (
                <>
                  <AddressWrapper>
                    <LabeledText label='Eth address' text={eth} />
                    <LabeledText label='Fil address' text={f4} />
                  </AddressWrapper>
                  <br />
                </>
              )
            })}
        </StandardBox>
      </Lines>
    </>
  )
}
