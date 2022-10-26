import { getQueryParam } from '@glif/react-components'
import { useRouter } from 'next/router'
import { TxView } from '../src/components/TxView'

export default function Message() {
  const router = useRouter()
  const txID = getQueryParam.string(router, 'cid')
  return <TxView txID={txID} />
}
