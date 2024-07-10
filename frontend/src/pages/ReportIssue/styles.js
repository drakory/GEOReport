import styled from "styled-components";

export const ContainerReport = styled.div`
  display: flex;
  justify-content: center;
`;

export const ContainerInfosReport = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 50%;
`;

export const ContainerInputs = styled.div`
  margin: 20px 0px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const InputChangeImage = styled.input`
  color: #000;
  font-size: 16px;
  margin: 4px 0;
  padding: 2px 8px;
`;

export const InputEditReport = styled.input`
  color: #000;
  font-size: 16px;
  margin: 4px 0;
  padding: 2px 8px;
`;

export const InputEditReportDescription = styled.input`
  color: #000;
  font-size: 16px;
  margin: 4px 0;
  padding: 2px 8px;
  height: 200px;
`;

export const ContainerButtonAdd = styled.div`
  display: flex;
  justify-content: center;
`;

export const ButtonAddReport = styled.button`
  background-color: #fdc544;
  color: #fff;
  border-radius: 16px;
  border: none;
  padding: 8px 20px;
  text-transform: uppercase;
  font-weight: bold;

  &:hover {
    opacity: 100%;
    -webkit-transform: scale(1.4);
    transform: scale(1.1);
  }
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

export const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

