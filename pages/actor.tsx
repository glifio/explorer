import { getQueryParam } from '@glif/react-components'
import { useRouter } from 'next/router'
import { AddressView } from '../src/components/AddressView'

export default function Actor() {
  const router = useRouter()
  const address = getQueryParam.string(router, 'address')
  return <AddressView address={address} />
}
