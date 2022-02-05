import styled, { css } from 'styled-components'
import { devices, space, fontSize } from '@glif/react-components'

export const ResponsiveWalletTile = styled.div`
  @media (min-width: ${devices.tablet}) {
    position: sticky;
    top: ${space()};

    ${(props) =>
      !props.phishingBannerClosed
        ? css`
            height: calc(100vh - 50px - (${space()} * 3));
          `
        : css`
            height: calc(100vh - (${space()} * 2));
          `}
  }

  @media (max-width: ${devices.tablet}) {
    height: 250px;
  }
`

export const ConnectContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

  @media (max-width: ${devices.tablet}) {
    padding: 80px 30px 30px;
  }

  @media (min-width: ${devices.tablet}) {
    padding: ${space('large')} 50px 50px 50px;
  }
`

export const TextBox = styled.div`
  font-size: ${fontSize('large')};
  border-radius: 8px;
  margin-top: ${space()};
  display: flex;
  align-items: center;
  flex-direction: column;

  @media (max-width: ${devices.tablet}) {
    padding: 30px;
  }

  @media (min-width: ${devices.tablet}) {
    padding: 80px 40px;
  }

  p {
    margin: 0;
  }
`
