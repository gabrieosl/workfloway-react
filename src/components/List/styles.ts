import styled, { css } from 'styled-components';

export const Container = styled.main`
  flex: 1;

  display: flex;
  flex-direction: column;
  background: #f7f7f7;
  border-radius: 3px;
  margin-top: 15px;

  overflow-y: auto;
  padding: 10px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.7);

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100px;
    pointer-events: none;
    z-index: 20;

    border-radius: 3px;
    background: linear-gradient(
      0,
      #f7f7f7,
      #f7f7f7ee,
      #f7f7f7aa,
      #f7f7f755,
      #f7f7f700
    );
  }

  &::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
  }

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

  section {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

interface ItemProps {
  selected?: boolean;
  isRemovable?: boolean;
}

export const Item = styled.div<ItemProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 3px 0;
  padding: 10px 15px;
  border-radius: 10px;
  background: ${props => (props.selected ? '#FEF3D7' : 'none')};

  &:hover {
    background: ${props => (props.selected ? '#FAC74899' : '#eee')};
  }

  > strong {
    /* max-width: 300px; */
    font-size: 18px;
    display: flex;
    align-items: center;
  }

  div.tags-holder {
    display: flex;
    flex-direction: row;
    /* align-self: flex-end; */

    div.tag {
      background: #ddd;
      border-radius: 4px;
      box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
      padding: 2px 4px;
      display: flex;
      margin: 0 3px;

      align-items: center;

      strong {
        font-size: 16px;
        color: #888;
      }
      small {
        margin-left: 4px;
        font-size: 14px;
      }
    }
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
    height: 30px;
    width: 30px;
    border-radius: 50%;
    border: 0;

    background: ${_props => (_props.selected ? '#FAC748' : '#ddd')};
    color: ${_props => (_props.selected ? '#efa00b' : '#bbb')};
    &:hover {
      background: #fac748;
    }

    ${props =>
      props.isRemovable &&
      css`
        background: #ddd;
        color: #b30000;
        &:hover {
          background: #b30000;
          color: #ddd;
        }
      `};
  }

  &:last-child {
    margin-bottom: 100px;
  }
`;
