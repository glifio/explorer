import {
  ActorState,
  Box,
  Footer,
  MessageHistoryTable
} from '@glif/react-components'
import { useRouter } from 'next/router'
import { PAGE } from '../../constants'

export default function Address() {
  const router = useRouter()
  const address = router?.query?.address
  return (
    <>
      <Box ml={8} mt={3} mb={5}>
        {address && (
          <Box
            display='flex'
            flexDirection='column'
            justifyContent='center'
            width='fit-content'
          >
            <ActorState address={address as string} />
            <MessageHistoryTable
              address={address as string}
              addressHref={(address: string) => `${PAGE.ADDRESS}/${address}`}
              cidHref={(cid: string) => `${PAGE.MESSAGE}/${cid}`}
            />
          </Box>
        )}
      </Box>
      <Footer />
    </>
  )
}
