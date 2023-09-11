import { styled } from "styled-components";

export const HomeContainer = styled.main`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }

  @media only screen and (max-width: 1300px) {
    form {
      gap: 1rem;
    }
  }
`;

export const CountdownButton = styled.button`
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

export const Title = styled.div`
  max-width: 80%;
  text-align: center;
  p {
    font-size: 2rem;
  }
`;

export const StartCountdownButton = styled(CountdownButton)`
  background-color: ${({ theme }) => theme["green-500"]};

  &:not(:disabled):hover {
    background-color: ${({ theme }) => theme["green-700"]};
  }
`;
export const StopCountdownButton = styled(CountdownButton)`
  background-color: ${({ theme }) => theme["red-500"]};

  &:not(:disabled):hover {
    background-color: ${({ theme }) => theme["red-700"]};
  }
`;
