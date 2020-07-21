import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  /* background: #fff; */
  /* border-radius: 10px; */
  margin-top: 5px;

  overflow-y: auto;
  /* padding: 10px; */
  /* box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.4); */
`;

export const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 3px 0;
  padding: 10px 15px;
  border-radius: 10px;
  background: none;

  &:hover {
    background: #eee;
  }

  > strong {
    flex: 1;
    /* max-width: 300px; */
    font-size: 18px;
  }
`;

export const ItemButtonsHolder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  strong {
    margin-right: 10px;
  }

  button {
    background: none;
    border: 0;

    svg {
      width: 20px;
      height: 20px;
    }

    &.edit {
      color: #aaa;
      margin-right: 5px;
    }

    &.delete {
      color: #b30000;
    }

    &.confirm {
      color: #006600;
    }
  }
`;
