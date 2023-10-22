import styled from "styled-components";

export const BaseInput = styled.input`
  background-color: transparent;
  height: 2.5rem;
  border: 0;
  border-bottom: 2px solid ${({ theme }) => theme["input-border"]};
  font-weight: bold;
  font-size: 1.125rem;
  padding: 0 0.5rem;
  color: ${({ theme }) => theme["input-color"]};
  color-scheme: ${({ theme }) => theme["input-color-scheme"]};

  &::placeholder {
    color: ${({ theme }) => theme["input-placeholder"]};
  }

  &:focus {
    box-shadow: none;
    border-color: ${({ theme }) => theme["green-500"]};
  }
`;
