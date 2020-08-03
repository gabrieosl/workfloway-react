import styled, { css, keyframes } from 'styled-components';

const swipeFromBottom = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const appear = keyframes`
  from {
    opacity: 0;
  }
  75% {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
interface ContainerProps {
  showCard: boolean;
  isAnySelected?: boolean;
  showSelfWhenFloating?: boolean;
}

export const Container = styled.button<ContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  animation: ${appear} 2s;

  border: 0;
  color: #fff;
  background: #18b079;

  @media all and (min-width: 769px) {
    display: ${props =>
      props.showCard || !props.showSelfWhenFloating ? 'none' : ' flex'};
    position: absolute;
    height: 80px;
    width: 80px;
    bottom: 0;
    right: 0;

    border-radius: 50%;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.5);
    background: #18b079;
    margin: 28px 18px;
    color: #fff;

    span {
      position: absolute;

      display: flex;
      align-items: center;
      justify-content: center;

      background: #b30000;
      border-radius: 50%;
      height: 25px;
      width: 25px;
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
      left: 55%;
      bottom: 55%;
      /* transform: translateX(50%) translateY(-30%); */
      font-weight: bold;
    }
  }

  ${props =>
    !props.isAnySelected &&
    css`
      cursor: not-allowed;
      background: #ddd;
    `}

  &:hover {
    background: #28c089;
  }

  svg {
    width: 30px;
    height: 30px;
    z-index: 10;
  }
`;

interface FloatingCardProps {
  showCard: boolean;
}

export const FloatingCard = styled.div<FloatingCardProps>`
  z-index: 25;
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  /* margin-bottom: 60px; */
  animation: ${swipeFromBottom} 0.2s;
  background: #fff;
  padding: 15px;
  border-radius: 12px 12px 0 0;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.5);

  @media all and (min-width: 769px) {
    max-width: 380px;
    margin: 18px;
    border-radius: 12px;
  }

  aside {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 8px;

    button {
      border: 0;
      background: none;
      color: #b30000;

      svg {
        height: 25px;
        width: 25px;
      }
    }
  }

  input {
    margin-top: 8px;
    background: #fff;
    border-radius: 4px;
    border: 1px solid #ccc;
    padding: 9px;

    &:focus {
      border: 2px solid #2684ff;
    }
  }

  hr {
    margin: 8px 0;
  }

  button.submit-observation {
    margin-top: 5px;
    height: 28px;
    background: #006600;
    border-radius: 5px;
    border: 0;
    color: #fff;
  }
`;
