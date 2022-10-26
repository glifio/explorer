import { getQueryParam } from '@glif/react-components'
import { useRouter } from 'next/router'
import ActorDetail from '../../src/components/ActorDetail'

export default function Actor() {
  const router = useRouter()
  const address = getQueryParam.string(router, 'address')
  return <ActorDetail address={address} />
}
