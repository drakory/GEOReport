import styled from "styled-components";

export const ContainerUser = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

export const ButtonUpdate = styled.button`
background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
  border-radius: 12px;

  &:hover {
    background-color: white;
    color: black;
    border: 2px solid #4CAF50;
  }

  &:active {
    background-color: #3e8e41;
    color: white;
    border: none;
  }
`;