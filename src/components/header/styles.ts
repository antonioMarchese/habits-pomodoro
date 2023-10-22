import { styled } from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;

  img {
    width: 3rem;
  }

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

      color: ${({ theme }) => theme["menu-items"]};

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

    .gear {
      svg {
        transition: transform 300ms ease-in;
      }
      &:hover {
        svg {
          transform: rotate(-90deg);
        }
      }
    }
  }
`;
