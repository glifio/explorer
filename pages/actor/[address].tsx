import { useRouter } from 'next/router'
import ActorDetail from '../../src/components/ActorDetail'

export default function Actor() {
  const router = useRouter()
  const address = router.query.address as string
  return <ActorDetail address={address} />
}
