import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  background: #f0fff0;
  flex: 1;
  overflow-y: hidden;
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

export const WorkflowSelector = styled.div`
  height: 60px;
  background: yellow;
`;
