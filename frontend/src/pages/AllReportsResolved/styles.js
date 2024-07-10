import styled from "styled-components";

export const ContainerReports = styled.div`
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

export const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

export const FiltersWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
  background-color: #f7f7f7; /* Light grey background */
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
`;

export const FilterLabel = styled.label`
  font-weight: bold;
  color: #333;
`;

export const FilterSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  &:focus {
    border-color: #007bff;
  }
`;

export const FilterInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  &:focus {
    border-color: #007bff;
  }
`;