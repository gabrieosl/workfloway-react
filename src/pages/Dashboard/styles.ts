import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;

  align-items: stretch;
  background: #03126c;
`;

export const Main = styled.main`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #fff;
  margin: 15px;
  border-radius: 10px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3), -5px -5px 5px rgba(0, 0, 0, 0.3);
`;
