import { useRouter } from 'next/router'
import { MessageDetail } from '../../src/components/MessageDetail'

export default function Message() {
  const router = useRouter()
  const txID = router.query.txID as string
  return <MessageDetail txID={txID} />
}
