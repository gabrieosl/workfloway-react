import styled from 'styled-components';

export const Container = styled.div`
  flex: 1;
  display: flex;

  button.add-filter {
    height: 36px;
    padding: 0 8px;
    border-radius: 8px;
    background: #067bc2;
    color: #fff;
    margin: 0 4px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.4);

    svg {
      height: 15px;
      width: 15px;
    }

    span {
      margin: 0 4px;
    }
  }
`;

export const FilterPopup = styled.div`
  position: absolute;
`;
