import { styled } from "styled-components";

export const CountdownContainer = styled.div`
  font-family: "Roboto Mono", monospace;
  font-size: 3rem;
  line-height: 5rem;
  color: ${({ theme }) => theme["text-color"]};
  width: 100%;

  display: flex;
  gap: 0.5rem;

  span {
    background-color: ${({ theme }) => theme["countdown-bg"]};
    box-shadow: ${({ theme }) => theme["countdown-box-shadow"]};
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
  }
`;

export const TimerSeparator = styled.div`
  padding: 0.5rem 0;
  color: ${({ theme }) => theme["green-500"]};
  width: 1rem;
  overflow: hidden;
  display: flex;
  justify-content: center;

  @media only screen and (max-width: 1300px) {
    width: 2rem;
  }
`;
