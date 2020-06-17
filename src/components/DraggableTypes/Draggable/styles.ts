import styled from 'styled-components';

interface ContainerProps {
  isDragging: boolean;
}
export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;

  font-size: 22px;
  color: #000;
  padding: 8px;
  margin: 5px 10px;
  border-radius: 5px;
  background: #f0fff0;
  opacity: ${props => (props.isDragging ? 0.4 : 1)};

  svg {
    opacity: 0.3;
  }
  span {
    flex: 1;
    margin-left: 6px;
  }
`;
