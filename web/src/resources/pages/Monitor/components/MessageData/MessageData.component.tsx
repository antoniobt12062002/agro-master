import { useState } from 'react';
import { Container, DataMore } from './MessageData.styles';
import {
  BiSolidChevronDownCircle,
  BiSolidChevronUpCircle
} from 'react-icons/bi';
import { IMessageDataProps } from './MessageData.types';

export function MessageData({ message, date }: IMessageDataProps): JSX.Element {
  const [openMore, setOpenMore] = useState(false);

  return (
    <Container open={openMore}>
      <span>{message}</span>
      <p>{date}</p>
      <DataMore
        open={openMore}
        onClick={() => setOpenMore(!openMore)}
      >
        {!openMore ? (
          <>
            Ver mais
            <BiSolidChevronDownCircle />
          </>
        ) : (
          <>
            Ver menos
            <BiSolidChevronUpCircle />
          </>
        )}
      </DataMore>
    </Container>
  );
}
