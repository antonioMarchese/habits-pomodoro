import { styled } from "styled-components";

export const CountdownContainer = styled.div`
  font-family: "Roboto Mono", monospace;
  font-size: 8rem;
  line-height: 10rem;
  color: ${({ theme }) => theme["gray-100"]};

  display: flex;
  gap: 1rem;

  span {
    background-color: ${({ theme }) => theme["gray-700"]};
    padding: 2rem 1rem;
    border-radius: 8px;
  }

  @media only screen and (max-width: 1300px) {
    font-size: 4rem;
    line-height: 5rem;
    gap: 0.5rem;

    span {
      background-color: ${({ theme }) => theme["gray-700"]};
      padding: 1rem 0.5;
      border-radius: 8px;
    }
  }
`;

export const TimerSeparator = styled.div`
  padding: 2rem 0;
  color: ${({ theme }) => theme["green-500"]};
  width: 4rem;
  overflow: hidden;
  display: flex;
  justify-content: center;

  @media only screen and (max-width: 1300px) {
    width: 2rem;
  }
`;
