import { ChangeEvent, SyntheticEvent, useContext, useState } from 'react';
import Cookies from 'js-cookie';
import { Http } from '../../../app/data/api/config/Http';
import { message } from 'antd';
import { useChangeInputRecursive } from 'shared/hooks';
import { ContextState, IStateDataProvider } from 'app/context';
import { User } from 'shared/types/user.types';

export function useAuth() {
  const { onChangeToken } = useContext(ContextState) as IStateDataProvider;

  const [status, setStatus] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [authForm, setAuthForm] = useState({
    email: '',
    password: ''
  });

  const changeInput = (e: ChangeEvent<HTMLInputElement>) =>
    useChangeInputRecursive(e, authForm, setAuthForm);

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    if (Cookies.get('access-token') && localStorage.getItem('primaryLogin')) {
      return (window.location.href = '/home');
    } else {
      if (!authForm.email || !authForm.password) {
        setStatus(true);
        return message.error('Insira por favor email e senha!');
      }
      await Http.post('/user/access', { ...authForm })
        .then(res => {
          if (res.data) {
            onChangeToken(res.data.access);
            localStorage.setItem('primaryLogin', 'true');
            Cookies.set('access-token', res.data.access);
          }
          if (res.status === 201 || res.status === 200) {
            setSuccess(true);
            return message.success('Autenticado com sucesso');
          }

          if (res.status === 400) {
            setSuccess(false);
            return message.success(res.data.message);
          }
        })
        .catch(error => {
          console.log(error);
          setStatus(true);
          if (error.response) {
            return message.error(error.response.data.message);
          }
        });
    }
  }

  return {
    authForm,
    changeInput,
    status,
    success,
    handleSubmit,
    onChangeStatus: setStatus
  };
}