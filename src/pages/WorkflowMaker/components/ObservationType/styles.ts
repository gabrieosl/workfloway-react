import styled from 'styled-components';

interface ContainerProps {
  isDragging: boolean;
}
export const Container = styled.div<ContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  color: #fff;
  padding: 8px;
  margin: 5px 10px;
  border-radius: 5px;
  background: red;
  opacity: ${props => (props.isDragging ? 0.4 : 1)};
`;
