import styled from 'styled-components';

export const Container = styled.div`
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  flex: 1;

  padding: 40px;
  background: #fcf8ef;
`;

interface SelectionPanelProps {
  isEmpty?: boolean;
  isAnyMarked?: boolean;
}

export const SelectionPanel = styled.div<SelectionPanelProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;

  > strong {
    font-size: 24px;
    margin-right: 15px;
  }

  > div {
    flex: 1;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  }

  button#other {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    margin: 0 8px;
    width: 100px;
    height: 36px;

    border: 0;
    border-radius: 5px;
    color: #fff;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.4);

    &:hover {
      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.4);
    }

    &.clear-all {
      background: ${props => (props.isEmpty ? '#ddd' : '#b30000')};
      border-radius: 50%;
      width: 40px;
      height: 40px;
      color: #fff;
    }
  }

  button#edit {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    width: 36px;
    height: 36px;
    border: 0;
    margin-left: 8px;

    background: none;

    svg {
      opacity: 0.4;
    }
  }
`;
