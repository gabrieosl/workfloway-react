import styled from 'styled-components';

export const Container = styled.div`
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  flex: 1;

  padding: 40px;
  background: #efefef;
`;

export const Submenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;

  nav > button {
    background: none;
    border: 0;
    margin-right: 20px;
    padding-bottom: 5px;
    color: #bbb;
    font-size: 18px;

    &:last-child {
      margin: 0;
    }

    &.active {
      color: #666;
      font-weight: bold;
      border-bottom: 1px solid #000;
    }
  }
`;
