import { useRouter } from 'next/router'
import {
  navigate,
  Page,
  PageProps,
  ExplorerIconHeaderFooter,
  SearchAddressMessage
} from '@glif/react-components'

import { PAGE, GLIF_DISCORD } from '../../constants'

export default function ExplorerPage({ children, ...rest }: PageProps) {
  const router = useRouter()
  
  return (
    <Page
      appIcon={<ExplorerIconHeaderFooter />}
      customHeaderComps={<SearchAddressMessage
        hideErrorMessage
        onSearchAddress={(address) =>
          navigate(router, {
            pageUrl: PAGE.ACTOR,
            params: { address }
          })
        }
        onSearchMessage={(cid) =>
          navigate(router, {
            pageUrl: PAGE.MESSAGE,
            params: { cid }
          })
        }
      />}
      appHeaderLinks={[
        {
          title: 'Wallet',
          url: process.env.NEXT_PUBLIC_WALLET_URL
        },
        {
          title: 'Safe',
          url: process.env.NEXT_PUBLIC_SAFE_URL
        },
        {
          title: 'Blog',
          url: process.env.NEXT_PUBLIC_BLOG_URL
        },
        {
          title: 'Discord',
          url: GLIF_DISCORD
        }
      ]}
      {...rest}
    >
      {children}
    </Page>
  )
}

ExplorerPage.propTypes = {
  ...Page.propTypes
}
