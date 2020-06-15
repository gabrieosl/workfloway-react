import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100px;

  nav {
    margin-left: 70px;

    a {
      margin: 0 20px;
      color: #fff;
      font-weight: bold;
      font-size: 18px;
    }
  }

  aside {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 30px;

    svg {
      color: #efa00b;
    }

    strong {
      font-size: 18px;
      margin-left: 10px;
      margin-right: 40px;
      color: #efa00b;
    }

    button {
      border: 0;
      background: #020a3c;
      padding: 10px;
      border-radius: 6px;
      box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);

      svg {
        color: #efa00b;
        height: 20px;
        width: 20px;
      }
    }
  }
`;
