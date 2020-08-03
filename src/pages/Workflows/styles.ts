import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;

  padding: 40px;
  background: none;
  overflow-y: hidden;
`;

export const Main = styled.main`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #fff;
  margin: 15px;
  border-radius: 10px;
`;

export const WorkflowSelector = styled.div`
  display: flex;
  align-items: center;

  height: 60px;
  padding: 0 30px;

  strong {
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
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);

    &.save {
      background: #067bc2;
    }
    &.save-disabled {
      background: #bbb;
      cursor: not-allowed;
    }

    &.new {
      background: #006600;
    }

    svg {
      margin-right: 8px;
    }

    > span {
      position: absolute;
      height: 15px;
      width: 15px;
      border-radius: 50%;
      background: #b30000;
      top: 0;
      transform: translate(6px, -6px);
      right: 0;
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
