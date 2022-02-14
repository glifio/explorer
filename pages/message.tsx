import { Box, Footer, MessageDetail } from '@glif/react-components'
import { useRouter } from 'next/router'
import { PAGE } from '../constants'

export default function Address() {
  const router = useRouter()
  const cid = router?.query?.cid
  return (
    <>
      <Box ml={8} mt={3} mb={5}>
        {cid && (
          <Box
            display='flex'
            flexDirection='column'
            justifyContent='center'
            width='fit-content'
          >
            <MessageDetail
              cid={cid as string}
              addressHref={(address: string) =>
                `${PAGE.ACTOR}/?address=${address}`
              }
            />
          </Box>
        )}
      </Box>
      <Footer />
    </>
  )
}
