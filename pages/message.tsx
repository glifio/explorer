import { getQueryParam } from '@glif/react-components'
import { useRouter } from 'next/router'
import { MessageDetail } from '../src/components/MessageDetail'

export default function Message() {
  const router = useRouter()
  const txID = getQueryParam.string(router, 'cid')
  return <MessageDetail txID={txID} />
}
