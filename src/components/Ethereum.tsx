import {
  ButtonV2,
  LabeledText,
  Lines,
  SearchBar,
  StandardBox,
  useEnvironment
} from '@glif/react-components'
import { newDelegatedEthAddress } from '@glif/filecoin-address'
import styled from 'styled-components'
import { useMemo, useState } from 'react'
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
  const [error, setError] = useState('')
  const { coinType } = useEnvironment()

  const walletf4 = useMemo(() => {
    if (address) {
      try {
        return newDelegatedEthAddress(address, coinType).toString()
      } catch {
        return ''
      }
    }
  }, [address, coinType])

  const onSearch = (addr) => {
    setConvertedAddrs((addrs) => {
      setError('')
      try {
        const newEntry = {
          eth: addr,
          f4: newDelegatedEthAddress(addr, coinType).toString()
        }

        if (!addrs) return [newEntry]
        return [newEntry, ...addrs]
      } catch (err) {
        setError(err.message || JSON.stringify(err))
      }
    })
  }
  return (
    <>
      <h3>Convert an Ethereum address to its Filecoin equivalent</h3>
      <Lines>
        {!address && (
          <>
            <ButtonV2
              large
              green
              onClick={() => connect({ connector: connectors[0] })}
            >
              Connect Wallet
            </ButtonV2>
            <P>Or</P>
          </>
        )}
        <SearchBar
          large
          buttonText='Convert'
          onSearch={onSearch}
          placeholder='0x...'
          inputError={error}
        />
        <StandardBox>
          {!!address && (
            <AddressWrapper>
              <LabeledText label='Eth address (from MetaMask)' text={address} />
              <LabeledText
                label='Fil address (from MetaMask)'
                text={walletf4}
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
