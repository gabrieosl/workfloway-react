import styled, { keyframes } from 'styled-components';

const grow = keyframes`
  to {
    max-height: 1000px;
    opacity: 1;
  }
`;
export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  button.add-filter {
    height: 36px;
    width: 58px;
    padding: 0 8px;
    border-radius: 8px;
    background: none;
    color: #000;
    margin: 0 4px;

    svg {
      height: 21px;
      width: 21px;
    }

    span {
      margin: 0 4px;
    }
  }
`;

interface FilterPopupProps {
  showFilterPopup: boolean;
}

export const FilterPopup = styled.div<FilterPopupProps>`
  display: flex;
  flex-direction: column;

  max-height: 0;
  opacity: 0;
  width: 100%;
  height: ${props => (props.showFilterPopup ? '100%' : 0)};
  animation: ${grow} 1s ease-in-out forwards;

  background: none;

  @media all and (max-width: 768px) {
    width: 100%;
  }

  @media all and (min-width: 769px) {
    flex-direction: row;

    button.add-filter {
      margin: 0 5px;
      background: #fff;

      span {
        font-weight: bold;
      }
    }
  }
`;
