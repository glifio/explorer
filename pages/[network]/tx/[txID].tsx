import { useRouter } from 'next/router'
import { TxView } from '../../../src/components/TxView'

export default function Message() {
  const router = useRouter()
  const txID = router.query.txID as string
  return <TxView txID={txID} />
}
