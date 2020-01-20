// Menu.styled.js
import styled from "styled-components";

export const StyledMenu = styled.nav`
  height: 100vh;
  width: 40%;
  background: ${({ theme }) => theme.primaryLight};

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: flex-start;
  text-align: center;
  padding: 2rem;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 8;
  transform: ${({ open }) =>
    open ? "skewX(-15deg) translateX(0%)" : "translateX(100%)"};
  transform-origin: bottom left;
  transition: transform 0.3s ease-in-out;

  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
  }

  a {
    margin: 0.5em 0;
    padding: 0.2em 2em;
    font-size: 2em;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: ${({ theme }) => theme.primaryDark};
    text-decoration: none;
    transform: ${({ open }) =>
      open ? "skewX(15deg) translateX(0%)" : "translateX(100%)"};
    transition: color 0.15s, transform 0.5s;
    transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);

    @media (max-width: ${({ theme }) => theme.mobile}) {
      font-size: 1.5rem;
      text-align: center;
    }

    &:hover {
      color: ${({ theme }) => theme.primaryHover};
    }
    &:nth-child(1) {
      transition-delay: 0s, 100ms;
    }
    &:nth-child(2) {
      transition-delay: 0s, 150ms;
    }
    &:nth-child(3) {
      transition-delay: 0s, 200ms;
    }
    &:nth-child(4) {
      transition-delay: 0s, 250ms;
    }
    &:nth-child(5) {
      transition-delay: 0s, 300ms;
    }
    &:nth-child(6) {
      transition-delay: 0s, 350ms;
    }
  }
`;
