import styled from 'styled-components';

export const CreateButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: #006600;
  border: 0;
  border-radius: 5px;
  height: 36px;
  padding: 0 10px;
  color: #fff;
  font-weight: bold;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);

  svg {
    margin-right: 5px;
  }
`;

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;

  button.close {
    position: absolute;
    background: #444;
    border-radius: 5px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.7);
    border: 0;

    top: 0;
    right: 0;
    margin-top: 8px;
    margin-right: 15px;

    svg {
      color: #fff;
      width: 30px;
      height: 30px;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  background: #fff;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.3);

  form {
    width: 400px;
    display: flex;
    flex-direction: column;
  }
`;
