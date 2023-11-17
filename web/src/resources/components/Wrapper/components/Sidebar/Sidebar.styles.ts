import { Link, NavLink } from "react-router-dom";
import styled, { css } from "styled-components";
import { ContainerStyleType } from "./Sidebar.types";

export const Container = styled.div<ContainerStyleType>`
  transition: all 0.5s;
  ${({ openSidebar }) =>
    openSidebar
      ? css`
          width: 0;
          opacity: 0;
        `
      : css`
          width: 360px;
          height: 100%;
          background-color: #008000;
          overflow-x: none;
        `}

  @media (max-width: 700px) {
    ${({ openSidebar }) =>
      openSidebar
        ? css`
            width: 0;
            opacity: 0;
          `
        : css`
            position: absolute;
            width: 340px;
            height: 100%;
            background-color: #008000;
            overflow-x: none;
            z-index: 2;
          `}
  }
`;

export const CloseMobile = styled.div`
  display: none;
  
  @media (max-width: 700px) {
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    cursor: pointer;

    > svg {
      color: var(--white);
      font-size: 24px;
    }
  }
`;

export const SidebarTop = styled.div`
  padding: 0.7rem;
`;

export const SidebarLogo = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;

  > img {
    width: 70%;
  }
`;

export const SidebarLink = styled(Link)`
  margin-top: 1.5rem;
  background-color: #008000;
  height: 55px;
  border-radius: 6px;
  padding: 1rem;

  display: flex;
  align-items: center;
  color: var(--white);

  > svg {
    font-size: 28px;
  }

  &:hover {
    background-color: var(--white);
    color: #086404;
    border: 1px solid #008000;
  }
`;

export const SidebarTitle = styled.p`
  margin-left: 1rem;
  font-size: 18px;
  font-weight: 500;
`;

export const SidebarContent = styled.div`
  padding: 0.7rem;
`;

export const SidebarItem = styled(NavLink)`
  height: 55px;
  border-radius: 6px;
  padding: 1rem;

  display: flex;
  align-items: center;
  color: var(--white);

  margin: .5rem 0;

  > svg {
    font-size: 28px;
  }

  &:hover {
    color: #086404;
  }

  &.active {
    background-color: var(--white);
    color: #008000;
  }
`;
