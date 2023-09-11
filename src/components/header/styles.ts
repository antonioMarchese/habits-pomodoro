import { styled } from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;

  nav {
    display: flex;
    gap: 0.5rem;

    a {
      height: 3rem;
      width: 3rem;
      text-decoration: none;

      display: flex;
      align-items: center;
      justify-content: center;

      color: ${({ theme }) => theme["gray-100"]};

      border-top: 3px solid transparent;
      border-bottom: 3px solid transparent;

      transition: all 250ms ease-in;

      &:hover {
        border-bottom: 3px solid ${({ theme }) => theme["green-300"]};
      }

      &.active {
        color: ${({ theme }) => theme["green-300"]};
      }
    }
  }
`;
