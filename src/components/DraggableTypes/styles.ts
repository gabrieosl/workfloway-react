import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  overflow-y: hidden;
  border-radius: 10px;
  background: #fff;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  width: 30%;
  max-width: 400px;
  margin: 15px;

  h1 {
    text-align: center;
    padding: 6px;
  }
`;

export const ObservationTypesWrapper = styled.div`
  max-height: 100%;
  flex: 0;
  padding-bottom: 73px;

  overflow-y: auto;

  h1 {
    color: #000059;
    text-align: center;
    padding: 10px 0;
  }
`;
