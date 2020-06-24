import styled, { css } from 'styled-components';

interface FloatingButtonProps {
  showCard: boolean;
  isAnySelected?: boolean;
}

export const FloatingButton = styled.button<FloatingButtonProps>`
  position: absolute;
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: center;

  height: 80px;
  width: 80px;
  bottom: 0;
  right: 0;
  border: 0;
  border-radius: 50%;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.5);

  background: #18b079;
  margin: 28px 18px;
  color: #fff;

  ${props =>
    !props.isAnySelected &&
    css`
      cursor: not-allowed;
      background: #000;
      opacity: 0.3;
    `}

  &:hover {
    background: #28c089;
  }

  svg {
    width: 30px;
    height: 30px;
    z-index: 10;
  }

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
`;

export const FloatingCard = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  max-width: 380px;

  display: flex;
  flex-direction: column;

  padding: 15px;
  margin-bottom: 118px;
  margin-right: 18px;
  border-radius: 12px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.5);

  background: #f2fdf9;

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
`;
