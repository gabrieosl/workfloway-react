import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  width: 100%;
  background: #0000b3;
  display: flex;
  overflow-y: hidden;
`;

export const WorkflowArea = styled.div`
  flex: 1;
  font-size: 44px;
  border-radius: 10px;
  box-shadow: 3px 3px 5px 5px rgba(0, 0, 0, 0.3);
  background: #fff;
  margin: 15px;
`;

export const ObservationTypes = styled.div`
  width: 30%;
  max-width: 400px;
  margin: 15px;
`;

export const ObservationTypesWrapper = styled.div`
  max-height: 100%;
  border-radius: 10px;
  background: #fff;
  box-shadow: 5px 15px 15px 5px rgba(0, 0, 0, 0.5);
  overflow-y: auto;

  h1 {
    color: #000059;
    text-align: center;
    padding: 10px 0;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 40px;

    background: #000059;
    border: 0;
    border: 1px solid #0000b3;
    border-radius: 0 0 10px 10px;
    color: #fff;
    margin-top: 30px;
  }
`;

// export const Selection = styled.div`
//   position: absolute;
//   bottom: 0;
//   right: 0;
//   height: 100px;
//   max-width: 800px;
//   margin: 20px;
//   border-radius: 10px;
//   background: #eee;

//   display: flex;
//   justify-content: center;
//   align-items: center;

//   aside {
//     display: flex;
//     justify-content: center;
//     align-items: center;

//     height: 80px;
//     width: 80px;
//     margin: 10px;
//     border-radius: 50%;
//     background: #000053;
//   }
// `;
