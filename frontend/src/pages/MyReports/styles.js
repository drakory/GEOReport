import styled from "styled-components";

export const ContainerBooks = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60px); 
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export const MapWrapper = styled.div`
  flex: 1;
  @media (min-width: 768px) {
    height: 100vh;
  }
`;

export const FormWrapper = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  @media (min-width: 768px) {
    height: 100vh;
  }
`;