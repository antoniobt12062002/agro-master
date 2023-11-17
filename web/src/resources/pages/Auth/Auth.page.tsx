import {
  AuthContainer,
  AuthForm,
  AuthInputEmail,
  AuthInputPassword,
  AuthSubmit,
  ButtonSubmit,
  Container,
  LanguageOptions,
  LogoArea,
  RegisterNow
} from './Auth.styles';
import {
  AiOutlineLock,
  AiOutlineMail,
  AiOutlineInfoCircle
} from 'react-icons/ai';
import Logo from '../../assets/images/agrosoil.svg';
import { Select, Tooltip } from 'antd';
import { useAuth } from './useAuth';
import { Link, Redirect } from 'react-router-dom';
import { LanguageKeyType } from 'shared/hooks/useLang/useLang.types';
import { useLang } from 'shared/hooks/useLang/useLang';

export function Auth(): JSX.Element {
  const { lang, currentLang, onChangeLanguage } = useLang();

  const {
    authForm,
    changeInput,
    handleSubmit,
    status,
    success,
    onChangeStatus
  } = useAuth();

  return (
    <>
      <Container>
        <AuthContainer>
          <LogoArea>
            <img
              src={Logo}
              alt='AgroSoil'
            />
           <span style={{ color: '#ffffff' }}>{lang.auth.sub_title[currentLang]}</span>
          </LogoArea>
          <AuthForm
            onSubmit={e => handleSubmit(e)}
            id='form_auth'
          >
            <AuthInputEmail
              placeholder='Email'
              prefix={<AiOutlineMail />}
              suffix={
                <Tooltip
                  title={lang.auth.example_email[currentLang]}
                  arrow
                  autoAdjustOverflow
                >
                  <AiOutlineInfoCircle style={{ color: 'rgba(0,0,0,.45)' }} />
                </Tooltip>
              }
              name='email'
              value={authForm.email}
              status={status ? 'error' : ''}
              onChange={changeInput}
              onFocus={() => onChangeStatus(false)}
            />

            <AuthInputPassword
              placeholder='Senha de usuário'
              prefix={<AiOutlineLock className='input_user_ico' />}
              name='password'
              value={authForm.password}
              status={status ? 'error' : ''}
              onChange={changeInput}
              onFocus={() => onChangeStatus(false)}
            />

            <AuthSubmit>
              <ButtonSubmit
                htmlType='submit'
                type='primary'
                form='form_auth'
                onClick={e => handleSubmit(e)}
              >
                {lang.global.access[currentLang]}
              </ButtonSubmit>
            </AuthSubmit>
            <RegisterNow>
              <Link to='/register' style={{ color: 'green', textDecoration: 'none' }}>
                {lang.auth.without_account[currentLang]}
              </Link>
            </RegisterNow>
          </AuthForm>
        </AuthContainer>
      </Container>
      {success && <Redirect to='/home' />}
    </>
  );
}
