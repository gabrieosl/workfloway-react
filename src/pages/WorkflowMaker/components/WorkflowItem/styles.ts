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

  margin: 0 auto;
  max-width: 500px;

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
    text-align: center;
    width: 100%;
    height: 30px;
    background: #ccc;
    transition: margin 0.2s ease-in;

    margin-top: 0;
    border-radius: 5px;

    svg {
      color: pink;
      /* display: block; */
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
