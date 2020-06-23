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
  isAllMarked?: boolean;
  isAnyMarked?: boolean;
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

    margin: 0 25px;
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
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);

    &:hover {
      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.4);
    }

    &#add-selection {
      background: ${props => (props.isAnyMarked ? '#fac748' : '#ddd')};
      cursor: ${props => (props.isAnyMarked ? 'pointer' : 'not-allowed')};
      padding: 0 8px;

      span {
        position: absolute;

        display: flex;
        align-items: center;
        justify-content: center;

        background: #b30000;
        border-radius: 50%;
        height: 25px;
        width: 25px;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
        right: 0;
        top: 0;
        transform: translateX(50%) translateY(-30%);
        font-weight: bold;
      }
    }

    &#mark-all {
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
