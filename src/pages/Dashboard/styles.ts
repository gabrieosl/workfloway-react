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
  isAnyMarked: boolean;
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

export const List = styled.main`
  flex: 1;

  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 10px;
  margin-top: 5px;

  overflow-y: auto;
  padding: 10px;

  > button {
    align-self: center;
    color: #dedede;
    border: 0;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-top: 14px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
    color: #067bc2;
  }
`;

interface ItemProps {
  marked?: boolean;
}

export const Item = styled.div<ItemProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 3px 0;
  padding: 5px 15px;
  border-radius: 10px;
  background: ${props => (props.marked ? '#FEF3D7' : 'none')};

  &:hover {
    background: ${props => (props.marked ? '#FAC74899' : '#eee')};
  }

  > strong {
    flex: 1;
    /* max-width: 300px; */
    font-size: 18px;
  }

  > span {
    flex: 1;

    margin: 0 8px;

    text-align: right;
    font-size: 18px;
    font-weight: bold;
    color: orange;
  }

  > small {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #03126c;
    color: #fff;
    padding: 4px;
    margin: 0 8px;
  }

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 120px;
    margin: 0 8px;

    p {
      display: flex;
      align-items: center;

      color: #bbb;
      font-size: 12px;

      svg {
        opacity: 0.5;
        margin-right: 4px;
      }
    }
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: 40px;
    background: ${props => (props.marked ? '#FAC748' : '#ddd')};
    color: ${props => (props.marked ? '#efa00b' : '#bbb')};
    border-radius: 50%;
    border: 0;
    &:hover {
      background: #fac748;
    }
  }
`;
