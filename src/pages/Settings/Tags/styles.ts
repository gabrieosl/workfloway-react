import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 10px;
  margin-top: 5px;

  overflow-y: auto;
  padding: 10px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.4);
`;

export const ButtonBox = styled.div`
  display: flex;
  align-self: flex-end;
`;
