import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;

  @media all and (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

export const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  padding: 0;
  margin: 0;
`;

export const PageComponent = styled.div`
  flex: 1;
  display: flex;
  margin: 0;
  padding: 0;

  @media all and (min-width: 500px) and (max-width: 768px) {
    padding: 20px;
  }

  @media all and (min-width: 769px) and (max-width: 992px) {
    padding: 40px;
  }
  @media all and (min-width: 993px) and (max-width: 1200px) {
    padding: 40px 60px;
  }
  @media all and (min-width: 1201px) {
    padding: 40px 120px;
  }
`;
