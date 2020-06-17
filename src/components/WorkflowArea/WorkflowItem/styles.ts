import styled, { css } from 'styled-components';

interface ContainerProps {
  isActive: boolean;
  isDragging?: boolean;
}

export const Container = styled.div<ContainerProps>`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  opacity: ${props => (props.isDragging ? 0.4 : 1)};

  #start,
  #end {
    background: #000056;
    color: #fff;
  }

  &:first-child {
    svg.arrow {
      display: none;
    }
  }

  svg.arrow {
    width: 25px;
    height: 25px;
    color: #000056;
  }

  main {
    font-size: ${props => (props.isDragging ? '16px' : '26px')};
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    height: 45px;
    background: #eee;
    transition: margin 0.2s ease-in;

    padding: 0 10px;
    margin-top: 0;
    border-radius: 5px;

    svg {
      color: #b30000;
      /* display: block; */
      &.drag-icon {
        opacity: 0.3;
      }
    }
    ${props =>
      props.isActive &&
      css`
        margin-top: 20px;
      `}

    button {
      border: 0;
      background: none;
      width: 15px;
      height: 15px;
    }
  }

  section {
    height: 30px;
    width: 100%;
    border: 1px solid green;
    border-radius: 5px;
  }
`;
