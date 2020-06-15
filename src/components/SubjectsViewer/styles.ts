import styled from 'styled-components';

export const Container = styled.div`
  #select {
    width: 30px;
  }

  #name {
    flex-grow: 3;
  }
  #rep {
    flex-grow: 1;
  }
  #stat {
    flex-grow: 1;
  }
  #edit {
    width: 120px;
  }
`;

export const Search = styled.div`
  height: 30px;
`;

export const Headers = styled.ul`
  display: flex;
  height: 40px;

  background: #020a3c;

  > div {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    span {
      font-size: 18px;
      color: #fff;
      border-left: 1px solid #fff;
      padding-left: 8px;
      line-break: 1;
    }

    &:first-child span {
      border: 0;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Subject = styled.ul`
  display: flex;
`;
