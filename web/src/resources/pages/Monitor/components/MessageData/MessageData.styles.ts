import styled, { css } from 'styled-components';
import { DataMoreStylesType } from './MessageData.types';

export const Container = styled.div<DataMoreStylesType>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.7rem 1rem;
  border: 1px solid var(--grey-1);
  animation: up .5s;

	> p {
		font-weight: bold;
	}

  ${({ open }) =>
    !open
      ? css`
          background: var(--white);

          > span {
            max-width: 250px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        `
      : css`
          border: 1px solid var(--font-2);
					border-radius: 4px;
          flex-direction: column;
          background: var(--grey-1);
          gap: 2rem;
        `}
`;

export const DataMore = styled.div<DataMoreStylesType>`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  text-decoration: underline;
  ${({ open }) =>
    !open
      ? css`
          color: var(--blue-1);
        `
      : css`
          color: var(--red-1);
        `};
  cursor: pointer;

  > svg {
    font-size: 18px;
  }
`;
