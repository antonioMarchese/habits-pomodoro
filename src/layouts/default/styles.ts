import { styled } from "styled-components";

export const LayoutContainer = styled.div`
  max-width: 74rem;
  margin: 5rem auto;

  padding: 2.5rem;
  background: ${({ theme }) => theme["layout-bg"]};
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  position: relative;
`;
