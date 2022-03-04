import {
  Page,
  PageProps,
  ExplorerIconHeaderFooter
} from '@glif/react-components'

export default function ExplorerPage({ children, ...rest }: PageProps) {
  return (
    <Page
      appIcon={<ExplorerIconHeaderFooter />}
      appHeaderLinks={[
        {
          title: 'Blog',
          url: process.env.NEXT_PUBLIC_BLOG_URL
        },
        {
          title: 'Wallet',
          url: process.env.NEXT_PUBLIC_WALLET_URL
        },
        {
          title: 'Safe',
          url: process.env.NEXT_PUBLIC_SAFE_URL
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
