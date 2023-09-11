import { styled } from "styled-components";

export const RadioContainer = styled.div`
  max-width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  padding: 1rem;
  border-radius: 8px;

  background-color: ${({ theme }) => theme["player-bg"]};

  position: fixed;
  right: 0;
  bottom: 0;
  margin: 2rem;
`;
