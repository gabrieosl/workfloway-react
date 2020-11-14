import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  flex: 1;

  background: none;
  padding: 0;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;
  }

  button.create-new {
    align-self: flex-end;
    font-weight: bold;
    padding: 0 10px;
    width: 50px;
    background: none;

    span {
      display: none;
    }

    svg {
      height: 35px;
      width: 35px;
    }
  }

  @media all and (min-width: 501px) {
    button.create-new {
      background: #006600;
      color: #fff;
      height: 36px;
      width: 150px;
      border-radius: 5px;
      span {
        display: block;
      }
    }
  }
`;

interface SelectionPanelProps {
  areAllSubjectsMarked: boolean;
}

export const SelectionPanel = styled.div<SelectionPanelProps>`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 5px;
  transition: height 1s;

  @media all and (min-width: 769px) {
    flex-direction: row;
  }

  button.select-all {
    align-self: flex-end;
    background: ${props => (!props.areAllSubjectsMarked ? '#ddd' : '#fac748')};
    border-radius: 50%;
    width: 36px;
    height: 36px;
    color: #bbb;

    svg + svg {
      position: absolute;
      opacity: 0.7;
      transform: translateX(4px) translateY(1px);
    }

    @media all and (max-width: 768px) {
      position: absolute;
      right: 0;
      top: 0;
    }
  }
`;
