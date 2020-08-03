import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1000;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  background: #fff;
  border-radius: 10px;
  box-shadow: 3px 3px 5px black;

  button.popup-close-button {
    background: none;
    border: 0;

    align-self: flex-end;
    margin-top: 5px;
    margin-right: 5px;
    max-width: 24px;
    max-height: 24px;

    svg {
      width: 24px;
      height: 24px;
    }
  }

  width: 100%;
  height: 100%;

  @media all and (min-width: 769px) {
    max-width: 600px;
    max-height: 80%;
  }
`;
