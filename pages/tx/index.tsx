import { getQueryParam } from '@glif/react-components'
import { useRouter } from 'next/router'
import { MessageDetail } from '../../src/components/MessageDetail'

export default function Message() {
  const router = useRouter()
  const cid = getQueryParam.string(router, 'cid')
  const cidOrTxHash = getQueryParam.string(router, 'cidOrTxHash')
  return <MessageDetail cidOrTxHash={cidOrTxHash || cid} />
}
