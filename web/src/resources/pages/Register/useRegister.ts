import { message } from 'antd';
import { Http } from 'app/data/api/config/Http';
import { ChangeEvent, SyntheticEvent, useState } from 'react';

import { useChangeInputRecursive } from 'shared/hooks';

export function useRegister() {
  const [success, setSuccess] = useState<boolean>(false);
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
  });

  const useChangeInput = (e: ChangeEvent<HTMLInputElement>) =>
    useChangeInputRecursive(e, registerForm, setRegisterForm);

  async function handleRegister(e: SyntheticEvent) {
    e.preventDefault();
    if(registerForm.password !== registerForm.passwordConfirm) return message.warning('As senhas não conferem');

    await Http.post('/user/register', { ...registerForm })
      .then(res => {
        if (res.data) {
          setSuccess(true);
          return message.success(`Bem vindo ${registerForm.name}`);
        }
      })
      .catch(error => {
        if (error.response) {
          return message.warning(error.response.data.message);
        }
      });
  }

  return {
    registerForm,
    success,
    useChangeInput,
    handleRegister
  };
}
