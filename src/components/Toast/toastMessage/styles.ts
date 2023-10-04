import styled, { css } from "styled-components";

interface ContainerToastProps extends React.HTMLProps<HTMLDivElement> {
  type: "default" | "danger" | "success";
  animation: "appearing" | "hiding";
}

const containerVariants = {
  default: css`
    background: ${({ theme }) => theme["gray-700"]};
  `,
  danger: css`
    background: ${({ theme }) => theme["red-500"]};
  `,
  success: css`
    background: ${({ theme }) => theme["green-500"]};
  `,
};

const animationVariants = {
  appearing: css`
    animation: appearing 350ms ease-in-out;
  `,
  hiding: css`
    animation: hiding 350ms ease-in-out;
  `,
};

export const Container = styled.div<ContainerToastProps>`
  padding: 1rem 2rem;
  border-radius: 4px;
  color: white;
  opacity: 0.8;
  box-shadow: ${({ theme }) => theme.boxShadow};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;

  transition: opacity 250ms ease-out;

  &:hover {
    opacity: 1;
  }

  ${({ type }) => containerVariants[type] || containerVariants.default}

  svg {
    margin-right: 0.5rem;
  }

  & + & {
    margin-top: 12px;
  }

  cursor: pointer;

  ${({ animation }) =>
    animationVariants[animation] || animationVariants.appearing}

  @keyframes appearing {
    0% {
      transform: translateY(200%);
    }
    100% {
      transform: translateY(0);
    }
  }

  @keyframes hiding {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(200%);
    }
  }
`;

export const TopBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  opacity: 0.2;
  background-color: ${({ theme }) => theme["gray-100"]};
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;

  animation: tictoc 3500ms ease-in-out;

  @keyframes tictoc {
    0% {
      width: 0%;
    }
    100% {
      width: 100%;
    }
  }
`;
