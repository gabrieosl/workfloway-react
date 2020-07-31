import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: space-between;
  align-items: center;

  height: 100vh;
  width: 80px;
  background: #067bc2;
  padding-top: 60px;

  @media all and (max-width: 768px) {
    flex-direction: row;
    height: 60px;
    width: 100vw;
    padding: 0;
    background: #fff;
    border-top: 1px solid #ddd;
  }

  nav {
    display: flex;
    flex-direction: column;
    flex: 1;

    @media all and (max-width: 768px) {
      justify-content: space-around;
      flex-direction: row;
      height: 100%;
    }
  }

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    background: none;
    color: #000;
    width: 100%;
    height: 100%;

    svg {
      height: 25px;
      width: 25px;

      transition: all 0.2s;
    }

    @media all and (max-width: 768px) {
      opacity: 0.7;

      &.active {
        opacity: 1;
        svg {
          height: 30px;
          width: 30px;
        }
      }

      &#workflows {
        display: none;
      }

      &#selection span {
        display: none;
      }
    }

    @media all and (min-width: 769px) {
      position: relative;
      width: 50px;
      height: 50px;
      margin-bottom: 10px;
      border-radius: 4px;
      color: #fff;
      transition: background 0.2s;

      &#selection span {
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

      &.active#dashboard {
        background: #03126c;
      }

      &#dashboard.active {
        background: #03126c;
      }

      &#selection.active {
        background: #fac748;
      }

      &#workflows.active {
        background: #006600;
      }

      & #activities.active {
        background: #dedede;
        color: #777;
      }

      &#settings.active {
        background: #dedede;
        color: #777;
      }

      &.active {
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
      }

      &:hover {
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
      }
      &:active {
        box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
      }

      &:last-child {
        justify-self: flex-end;
      }
    }
  }

  div.separator {
    flex: 1;
    @media all and (max-width: 768px) {
      display: none;
    }
  }
`;
