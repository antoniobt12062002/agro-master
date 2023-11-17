import { ChangeEvent, Dispatch, SetStateAction } from 'react';

export function useChangeInputRecursive(
  e: ChangeEvent<HTMLInputElement>,
  state: any,
  changeState: Dispatch<SetStateAction<any>>
) {
  const { name, value } = e.target;
  console.log({ ...state, [name]: value });

  changeState({ ...state, [name]: value });
}
