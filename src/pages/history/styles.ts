import { styled } from "styled-components";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import * as Collapsible from "@radix-ui/react-collapsible";

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
  position: relative;
  height: 3rem;
`;

export const ButtonContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
  position: relative;
`;

export const LeftHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  position: relative;
`;

/* -------------------- FILTER -------------------- */

export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  gap: 1rem;
  color: ${({ theme }) => theme["gray-300"]};

  input {
    color: ${({ theme }) => theme["gray-500"]};
    color-scheme: dark;
  }

  .reset-filter {
    cursor: pointer;
    color: ${({ theme }) => theme["gray-400"]};
    transition: all 250ms linear;

    &:hover {
      color: ${({ theme }) => theme["gray-300"]};
    }
  }
`;

/* -------------------- Navigation Menu -------------------- */
export const NavigationMenuRoot = styled(NavigationMenu.Root)`
  position: relative;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  z-index: 1;
`;

export const NavigationMenuList = styled(NavigationMenu.List)`
  display: flex;
  justify-content: center;
  padding: 4px;
  border-radius: 6px;
  margin: 0;
  list-style: none;
`;

export const NavigationMenuTrigger = styled(NavigationMenu.Trigger)`
  all: unset;
  cursor: pointer;
  color: ${({ theme }) => theme["gray-400"]};
  transition: all 250ms ease-in;

  &:hover {
    color: ${({ theme }) => theme["gray-300"]};
  }
`;

export const NavigationMenuContent = styled(NavigationMenu.Content)`
  display: flex;
  flex-direction: column;
  align-items: center;
  animation-duration: 250ms;
  animation-timing-function: ease;
  flex: 1;

  .first-child {
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .last-child {
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  button {
    background-color: ${({ theme }) => theme["gray-600"]};
    opacity: 0.7;
    transition: all 250ms ease-in;
    color: ${({ theme }) => theme["gray-300"]} !important;

    &:hover {
      opacity: 1;
    }
  }

  @keyframes enterFromRight {
    0% {
      transform: translateX(200px);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes enterFromLeft {
    0% {
      transform: translateX(-200px);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes exitToRight {
    0% {
      transform: translateX(0);
      opacity: 1;
    }
    100% {
      transform: translateX(200px);
      opacity: 0;
    }
  }

  @keyframes exitToLeft {
    0% {
      transform: translateX(0);
      opacity: 1;
    }
    100% {
      transform: translateX(-200px);
      opacity: 0;
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    100% {
      opacity: 1;
    }
    0% {
      opacity: 0;
    }
  }

  &[data-motion="from-start"] {
    animation-name: enterFromLeft;
  }
  &[data-motion="from-end"] {
    animation-name: enterFromRight;
  }
  &[data-motion="to-start"] {
    animation-name: exitToLeft;
  }
  &[data-motion="to-end"] {
    animation-name: exitToRight;
  }
`;

export const NavigationMenuViewport = styled(NavigationMenu.Viewport)`
  position: relative;
  margin-top: 10px;
  width: 100%;
  border-radius: 6px;
  &[data-state="open"] {
    animation: scaleIn 200ms ease;
  }
  &[data-state="closed"] {
    animation: scaleOut 200ms ease;
  }

  @keyframes scaleIn {
    0% {
      transform: rotateX(-30deg) scale(0.9);
      opacity: 0;
    }
    100% {
      transform: rotateX(0deg) scale(1);
      opacity: 1;
    }
  }

  @keyframes scaleOut {
    0% {
      transform: rotateX(0deg) scale(1);
      opacity: 1;
    }
    100% {
      transform: rotateX(-10deg) scale(0.95);
      opacity: 0;
    }
  }
`;

export const ViewPortPosition = styled.div`
  position: absolute;
  display: flex;
  width: 30%;
  top: 100%;
  right: 0;
  transform: translateX(40%);
`;

export const NavigationMenuIndicator = styled(NavigationMenu.Indicator)`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 10px;
  top: 100%;
  overflow: hidden;
  z-index: 1;
  transition: width transform 250ms ease;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  &[data-state="visible"] {
    animation: fadeIn 200ms ease;
  }
  &[data-state="hidden"] {
    animation: fadeOut 200ms ease;
  }
`;

export const Arrow = styled.div`
  position: relative;
  top: 70%;
  background-color: ${({ theme }) => theme["gray-600"]};
  width: 10px;
  height: 10px;
  transform: rotate(45deg);
  border-top-left-radius: 2px;
`;

/* -------------------- Collapsible -------------------- */
export const CollapsibleRoot = styled(Collapsible.Root)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
`;

export const CollapsibleTrigger = styled(Collapsible.Trigger)`
  cursor: pointer;
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme["gray-400"]};
  transition: all 250ms ease-in;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${({ theme }) => theme["gray-300"]};
  }
`;

export const CollapsibleContent = styled(Collapsible.Content)`
  @keyframes slideRight {
    0% {
      width: 0;
      opacity: 0;
    }
    100% {
      width: 100%;
      opacity: 1;
    }
  }

  @keyframes slideLeft {
    0% {
      width: 100%;
      opacity: 1;
    }
    100% {
      width: 0;
      opacity: 0;
    }
  }
  input {
    width: 100%;

    &:focus {
      color: ${({ theme }) => theme["gray-100"]};
    }
  }

  &[data-state="open"] {
    animation: slideRight 300ms ease-out;
  }
  &[data-state="closed"] {
    animation: slideLeft 300ms ease-out;
  }
`;
