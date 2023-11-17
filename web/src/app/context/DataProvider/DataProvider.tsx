import { createContext, ReactNode, useEffect, useState } from 'react';

import Cookies from 'js-cookie';

import { IDataProviderProps, IStateDataProvider } from './Data.provider.types';
import { UserApi } from 'app/data/api/user/User.api';

export const ContextState = createContext<IStateDataProvider | null>(null);

export default function DataProvider({
  children
}: IDataProviderProps): ReactNode {
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    setToken(Cookies.get('access-token') ?? '');
  }, [token, setToken]);

  const state: IStateDataProvider = {
    token: token,
    onChangeToken: setToken,
    userApi: UserApi({ token })
  };

  return (
    <ContextState.Provider value={state}>{children}</ContextState.Provider>
  );
}
