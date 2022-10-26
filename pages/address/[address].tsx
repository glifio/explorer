import { useRouter } from 'next/router'
import { AddressView } from '../../src/components/AddressView'

export default function Actor() {
  const router = useRouter()
  const address = router.query.address as string
  return <AddressView address={address} />
}
