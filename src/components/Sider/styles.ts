import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: space-between;
  align-items: center;

  height: 100vh;
  width: 80px;
  background: #067bc2;
  padding-top: 60px;

  a {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 50px;
    height: 50px;
    margin-bottom: 10px;
    background: none;
    border-radius: 4px;
    color: #fff;
    transition: background 0.2s;

    svg {
      height: 25px;
      width: 25px;
    }

    &.active {
      box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
    }

    &.dashboard {
      &.active {
        background: #03126c;
      }
      &:hover {
        background: #03126c66;
      }
    }
    &.selections {
      &.active {
        background: #fac748;
      }
      &:hover {
        background: #fac74866;
      }
    }
    &.workflows {
      &.active {
        background: #006600;
      }
      &:hover {
        background: #00660066;
      }
    }
    &.activities {
      &.active {
        background: #dedede;
      }
      &:hover {
        background: #dedede66;
      }
    }
  }
`;

export const Menu = styled.nav`
  display: flex;
  flex-direction: column;
`;
export const Settings = styled(Link)`
  margin-bottom: 30px;
`;
