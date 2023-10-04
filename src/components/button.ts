import styled from "styled-components";

export const BaseButton = styled.button`
  border: none;
  border-radius: 4px;
  padding: 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: bold;

  cursor: pointer;
  color: ${({ theme }) => theme["gray-100"]};

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;
