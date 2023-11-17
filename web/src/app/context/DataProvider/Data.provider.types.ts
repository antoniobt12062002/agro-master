import { ReactNode } from 'react';

import { IUserApi } from 'app/data/api/user/User.types';

export interface IDataProviderProps {
  children: ReactNode;
}

export interface IStateDataProvider {
  token: string;
  onChangeToken: (value: string) => void;
  userApi: IUserApi;
}
