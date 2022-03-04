import {
  Page,
  PageProps,
  ExplorerIconHeaderFooter
} from '@glif/react-components'
import { GLIF_DISCORD } from '../../constants'

export default function ExplorerPage({ children, ...rest }: PageProps) {
  return (
    <Page
      appIcon={<ExplorerIconHeaderFooter />}
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
