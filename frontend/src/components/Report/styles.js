import styled from "styled-components";

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
`;

export const ReportCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin: 10px;
  width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const ReportType = styled.h3`
  margin-bottom: 10px;
`;

export const ReportImage = styled.img`
  width: 100%;
  height: 400px; /* Fixed height */
  object-fit: cover; /* Ensures the image covers the area while maintaining aspect ratio */
  border-radius: 8px;
`;

export const ReportDescription = styled.p`
  margin: 10px 0;
`;

export const ReportCoordinates = styled.div`
  font-size: 0.9em;
  color: #666;
  margin: 10px 0;
`;

export const ReportStatus = styled.div`
  font-weight: bold;
  margin-top: 10px;
`;
