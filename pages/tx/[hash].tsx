import { useRouter } from 'next/router'
import { MessageDetail } from '../../src/components/MessageDetail'

export default function Message() {
  const router = useRouter()
  return <MessageDetail cidOrTxHash={router.query.hash as string} />
}
