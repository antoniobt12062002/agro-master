import { useEffect, useState } from 'react';


import { IUserApi, IUserProps } from './User.types';
import { User } from 'shared/types/user.types';
import UserService from 'app/data/services/User/User.service';
import { message } from 'antd';

export function UserApi({ token }: IUserProps): IUserApi {
  const [isLogged, setIsLogged] = useState(false);
  const [userData, setUserData] = useState<User>();

  useEffect(() => {
    if (token) {
      async function getUser(): Promise<void> {
        try {
          const { data } = await UserService.getUser();

          if (data) {
            setUserData(data);
            setIsLogged(true);
          }
        } catch (error) {
          message.error('Algum erro ocorreu ao tentar obter usuário!');
        }
      }
      getUser();
    }
  }, [token]);

  return {
    userData,
    isLogged,
    onChangeUserData: setUserData,
    onChangeIsLogged: setIsLogged
  };
}
