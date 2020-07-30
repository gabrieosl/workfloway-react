import styled, { keyframes, css } from 'styled-components';

const appearFromRight = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;
interface ContainerProps {
  showProfile: boolean;
}

export const Container = styled.header<ContainerProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  margin: 0 20px;
  flex-shrink: 0;
  /* box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3); */
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  z-index: 10;

  > strong {
    font-size: 24px;
  }

  aside {
    position: relative;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    transition: all 700ms;

    overflow: hidden;

    @media all and (max-width: 500px) {
      ${props =>
        !props.showProfile &&
        css`
          transform: translateX(calc(100% - 20px));
        `}
    }

    strong {
      font-size: 18px;
      color: #000;
      margin: 0 10px;
    }

    button {
      border: 0;

      &#logout {
        background: #333;

        @media all and (min-width: 501px) {
          box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
        }
      }

      &#profile {
        background: none;
        transition: all 2s;

        svg {
          color: #000;
          &:last-child {
            display: none;
          }
        }

        @media all and (max-width: 500px) {
          svg:first-child {
            display: ${props => (props.showProfile ? 'none' : 'block')};
          }
          svg:last-child {
            display: ${props => (props.showProfile ? 'block' : 'none')};
            color: #b30000;
          }
        }
      }

      padding: 5px;
      border-radius: 6px;

      svg {
        color: #fff;
        height: 20px;
        width: 20px;
      }
    }
  }
`;
