import { CID } from 'multiformats/cid'

export default function (cid: string): boolean {
  try {
    CID.parse(cid)
    return true
  } catch {
    return false
  }
}
