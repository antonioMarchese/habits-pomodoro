import { styled } from "styled-components";

export const HistoryContainer = styled.main`
  flex: 1;
  padding: 3.5rem;
  display: flex;
  flex-direction: column;

  .empty {
    text-align: center;
    color: ${({ theme }) => theme["gray-300"]};
    a {
      text-decoration: none !important;
      color: ${({ theme }) => theme["green-300"]};
    }
  }

  h1 {
    font-size: 1.5rem;
    color: ${({ theme }) => theme["gray-100"]};
  }
`;

export const HistoryList = styled.div`
  flex: 1;
  overflow: auto;
  margin-top: 2rem;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;

    th {
      background-color: ${({ theme }) => theme["gray-600"]};
      padding: 1rem;
      text-align: center;
      font-size: 0.875rem;
      line-height: 1.6rem;

      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
        text-align: left;
      }

      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }

    td {
      background-color: ${({ theme }) => theme["gray-700"]};
      border-top: 4px solid ${({ theme }) => theme["gray-800"]};
      padding: 1rem;

      font-size: 0.875rem;
      line-height: 1.6rem;
      text-align: center;

      &:first-child {
        width: 40%;
        padding-left: 1.5rem;
        text-align: left;
      }

      &:last-child {
        padding-right: 1.5rem;
      }
    }
  }
`;

const STATUS_COLOR = {
  yellow: "yellow-500",
  red: "red-500",
  green: "green-500",
} as const;

interface StatusProps {
  statuscolor: keyof typeof STATUS_COLOR;
}

export const Status = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${({ theme, statuscolor }) =>
      theme[STATUS_COLOR[statuscolor]]};
  }
`;

export const HistoryHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    width: fit-content;
    background-color: ${({ theme }) => theme["green-700"]};
  }
`;
