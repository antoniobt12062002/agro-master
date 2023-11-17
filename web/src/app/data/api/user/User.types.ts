import { User } from "shared/types/user.types";


export interface IUserProps {
  token: string;
}

export interface IUserApi {
  isLogged: boolean;
  userData: User | undefined;
  onChangeUserData: (value: User) => void;
  onChangeIsLogged: (value: boolean) => void;
}