import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow-y: hidden;

  @media all and (max-width: 500px) {
    flex-direction: column-reverse;
  }
`;

export const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
`;
