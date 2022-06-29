import { act, render, RenderResult } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '@glif/react-components'

import IndexPage from '../pages/index'

jest.mock('@glif/filecoin-rpc-client')

describe('IndexPage', () => {
  test('it renders correctly', async () => {
    let result: RenderResult | null = null

    await act(async () => {
      result = render(
        <ThemeProvider theme={theme}>
          <IndexPage />
        </ThemeProvider>
      )
      jest.runAllTimers()
    })

    // Check snapshot
    expect(result.container.firstChild).toMatchSnapshot()
  })
})
