import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;

  right: 0;
  bottom: 0;
  margin: 15px;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #009900;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);

  svg {
    position: absolute;
    top: 0;
    left: 0;
    height: 30px;
    width: 30px;
    color: #efa00b;
  }

  span {
    color: #efa00b;
  }
`;
