import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow-y: auto;

  margin: 10px;

  nav {
    display: flex;
  }

  nav > button {
    background: none;
    border: 0;
    margin-right: 20px;
    padding-bottom: 5px;
    color: #bbb;
    font-size: 18px;

    &:last-child {
      margin: 0;
    }

    &.active {
      color: #666;
      font-weight: bold;
      border-bottom: 1px solid #000;
    }
  }

  main {
    display: flex;
    flex-direction: column;

    margin: 15px 0;

    strong {
      font-size: 24px;
      margin-bottom: 10px;
    }

    small {
      font-size: 18px;
      color: #555;
      font-weight: bold;
    }

    p {
      font-size: 16px;

      display: flex;
      flex-direction: row;
    }

    input.file {
      margin-top: 15px;
    }

    button {
      border-radius: 5px;
      box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
      border: none;
      padding: 0 20px;

      display: flex;
      align-self: center;
      place-content: center;
      align-items: center;

      &#new-line {
        background: #dedede;
        margin-top: 7px;
        margin-bottom: 20px;
        height: 28px;
      }

      &#create {
        background: #006600;
        color: #fff;
        height: 36px;
        margin-top: 20px;
        /* width: ; */
      }
    }
  }
`;
