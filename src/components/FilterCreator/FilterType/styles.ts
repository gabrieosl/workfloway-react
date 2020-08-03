import styled from 'styled-components';

interface Props {
  hasActiveFiltersWithType: boolean;
}

export const Container = styled.div<Props>`
  position: relative;

  button.filter-type {
    justify-content: flex-start;
    height: 24px;
    padding: 0 5px;
    margin: 5px;
    background: #fff;

    span {
      color: ${props => (props.hasActiveFiltersWithType ? '#067bc2' : 'black')};
      font-size: 20px;
      font-weight: bold;
    }

    svg {
      color: ${props => (props.hasActiveFiltersWithType ? '#067bc2' : 'black')};
    }
  }

  /* @media all and (min-width: 769px) {
    position: static;
  } */
`;

export const FilterTypePopup = styled.div`
  display: flex;
  flex-direction: column;

  padding: 10px 0;

  div.option-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
  }

  div.option {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
  }

  div.option-button {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;

    padding: 3px 5px;
    transition: all 0.2s;
    cursor: pointer;

    span {
      font-size: 20px;
    }

    button {
      background: none;
      margin-left: auto;
    }
  }

  div.option-active {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    background: #fff;
    padding: 0 5px;
  }

  button svg {
    color: #fff;
  }
  button.filter-active {
    position: relative;
    padding: 3px 5px;
    margin: 4px 2px;
    background: #03126c;
    color: #fff;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);

    svg {
      position: absolute;
      width: 100%;
      height: 100%;
      color: #b30000;
      opacity: 0;
      transition: opacity 0.3s;
      background: #fff;
      padding: 20%;
    }

    &:hover {
      svg {
        opacity: 1;
      }
    }
  }

  div.new-input-button {
    display: flex;
    flex: 1;
  }

  input {
    flex: 1;
    min-width: 100px;
    margin: 4px 2px;
  }

  button.new-filter {
    flex: 0;
    padding: 3px;
    margin: 4px 2px;
    background: #006600;
    color: #fff;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);

    svg {
      color: #fff;
      opacity: 0.7;
      transition: opacity 0.2s;
    }

    &:hover {
      svg {
        opacity: 1;
      }
    }
  }

  @media all and (min-width: 769px) {
    position: absolute;
    left: 0;
    top: 100%;
    width: 350px;

    background: #067bc2;
    color: white;
    border-radius: 5px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.4);

    div.option:hover {
      background: #03126c;
    }
  }
`;
