import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}
export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;

  padding: 16px;
  margin-bottom: 8px;

  background: #020a3c;
  border: 2px solid #020a3c;
  border-radius: 10px;
  width: 100%;

  ${props =>
    props.isErrored &&
    css`
      border: 2px solid #b30000;
    `}

  ${props =>
    props.isFocused &&
    css`
      border: 2px solid #efa00b;
      color: #efa00b;
    `}

  ${props =>
    props.isFilled &&
    css`
      svg {
        color: #efa00b;
      }
    `}


  svg {
    margin-right: 10px;
  }

  input {
    flex: 1;
    color: #f4ede8;
    border: 0;
    background: none;

    &::placeholder {
      color: #caf0f8;
      opacity: 0.5;
    }

    & + input {
      margin-top: 8px;
    }
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  svg {
    margin: 0;
  }
`;
