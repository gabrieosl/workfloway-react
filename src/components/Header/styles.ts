import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  flex-shrink: 0;
  /* box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3); */
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  z-index: 10;

  > strong {
    margin-left: 20px;
    font-size: 24px;
  }

  aside {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 15px;

    svg {
      color: #000;
    }

    strong {
      font-size: 18px;
      margin-left: 10px;
      margin-right: 20px;
      color: #000;
    }

    button {
      border: 0;
      background: #000;
      padding: 5px;
      border-radius: 6px;
      box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);

      svg {
        color: #fff;
        height: 20px;
        width: 20px;
      }
    }
  }
`;
