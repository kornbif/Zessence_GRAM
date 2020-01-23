import styled from "styled-components";

export const CategoryContainer = styled.div`
  width: 50%;
  min-height: 50%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-flow: row wrap;
  border: 1px solid #000;
  background: #ccc;
`;

export const CategoryCard = styled.div`
  width: 150px;
  height: 200px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #fff;
  margin: 1% auto;
`;
