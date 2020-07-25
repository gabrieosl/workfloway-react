import styled from 'styled-components';

export const Container = styled.div`
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  flex: 1;

  padding: 40px;
  background: #dbe5ff;
`;

interface SelectionPanelProps {
  isAllMarked: boolean;
}

export const SelectionPanel = styled.div<SelectionPanelProps>`
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  > strong {
    font-size: 24px;
  }
  section {
    flex: 1;
    display: flex;

    margin: 0 25px;

    > div {
      flex: 1;
      /* max-width: 250px; */
      margin-right: 15px;
    }

    > input {
      flex: 1;
      border: 1px solid #b3b3b3;
      border-radius: 5px;
      padding: 0 5px;
    }

    > button {
      display: flex;
      align-items: center;
      justify-content: center;

      margin: 0 8px;
      padding: 0 15px;
      height: 36px;

      border: 0;
      border-radius: 5px;
      color: #fff;
      background: #067bc2;
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.4);

      &:hover {
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.4);
      }
    }
  }

  > button {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    margin: 0 8px;
    height: 36px;

    border: 0;
    border-radius: 5px;
    color: #fff;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.4);

    &:hover {
      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.4);
    }

    &.new {
      background: #006600;
      font-weight: bold;
      padding: 0 10px;
    }

    &.mark-all {
      background: ${props => (props.isAllMarked ? '#ddd' : '#fac748')};
      border-radius: 50%;
      width: 40px;
      height: 40px;
      color: #bbb;

      svg + svg {
        position: absolute;
        opacity: 0.7;
        transform: translateX(4px) translateY(1px);
      }
    }
  }
`;

export const ActiveFilters = styled.section`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  margin-bottom: 8px;

  > span {
    color: #aaa;
  }

  > div {
    display: flex;
    align-items: center;

    background: #067bc2;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
    margin: 4px;
    padding: 6px;
    transition: all 0.2s;

    &:hover {
      background: #03126c;
      button svg {
        opacity: 1;
      }
    }

    &.removed {
      opacity: 0;
    }

    span {
      color: #fff;
      font-size: 14px;
      margin-right: 4px;
      cursor: default;
    }

    button {
      display: flex;
      align-items: center;

      border: 0;
      background: none;

      svg {
        height: 14px;
        width: 14px;
        color: #fff;
        opacity: 0.5;
        transition: opacity 0.2s;
      }
    }
  }
`;
