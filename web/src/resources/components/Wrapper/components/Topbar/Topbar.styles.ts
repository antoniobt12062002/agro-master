import styled from "styled-components";

export const Container = styled.div`
  height: 65px;
  box-shadow: 0 1px 12px 0 rgba(0, 0, 0, 0.25);
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1;
`;

export const Logout = styled.div`
  width: 100px;
  font-size: 18px;
  color: var(--red-1);
  font-weight: bold;
  cursor: pointer;
  text-align: center;
  padding: 0.3rem;
  border-radius: 4px;

  &:hover {
    border: 1px solid var(--red-1);
    background-color: var(--white);
    color: var(--red-1);
  }

  @media (max-width: 700px) {
    border: 1px solid var(--red-1);
    background-color: var(--white);
    color: var(--red-1);
  }
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  color: var(--font-1);
  font-size: 18px;

  > svg {
    margin-right: 1rem;
    font-size: 28px;
    cursor: pointer;
  }
`;
