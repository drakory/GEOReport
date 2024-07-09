import styled from "styled-components";

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const ReportCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 10px;
  padding: 20px;
  width: 100%;
  max-width: 400px;
`;

export const ReportType = styled.h3`
  margin: 0 0 10px 0;
  color: #333;
`;

export const ReportStatus = styled.h3`
  margin: 0 0 10px 0;
  color: #333;
`;

export const ReportImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 4px;
  margin-bottom: 10px;
`;

export const ReportDescription = styled.p`
  margin: 0 0 10px 0;
  color: #666;
`;

export const ReportCoordinates = styled.p`
  margin: 0;
  color: #999;
`;


