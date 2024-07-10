import styled from "styled-components";

export const ContainerReport = styled.div`
  display: flex;
  justify-content: center;
`;

export const ContainerInfoReport = styled.form`
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

export const InputEditRepor = styled.input`
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

export const ButtonAddBook = styled.button`
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

export const ButtonDelete = styled.button`
  margin-top: 8px;
  border: none;
  color: #fdc544;
  padding: 8px 54px;
  background: #fff5d4;
  border-radius: 4px;
  font-size: 18px;

  &:hover {
    -webkit-transform: scale(1.4);
    transform: scale(1.1);
  }
`;