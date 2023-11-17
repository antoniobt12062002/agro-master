import { Button, Input, Layout } from 'antd';
import styled from 'styled-components';
import backgroundImage from "../../assets/images/back.png";

const { Content, Footer } = Layout;

export const Container = styled(Layout)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;

  height: 100%;
  width: 100%;
  background-image: url(${backgroundImage});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const RegisterContainer = styled(Content)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100%;
  width: 100%;
  z-index: 2;
`;

export const LogoArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > span {
    font-size: 18px;
    color: var(--font-2);
    margin: 1rem 2rem;
    text-align: center;
  }
`;

export const RegisterForm = styled.form`
  width: min(100%, 450px);
  background: var(--white);
  padding: 1.5rem;
  border-radius: 6px;
  margin-top: 1rem;

  animation: left 0.5s;

  box-shadow: 8px 10px 10px 0px rgba(0, 0, 0, 0.25);
`;

export const RegisterSubmit = styled.div`
  margin-top: 1rem;
`;

export const RegisterInput = styled(Input)`
  height: 55px;
  color: var(--font-2);
  font-size: 18px;
  margin-bottom: 1rem;

  border-color: var(--font-2); 
  transition: border-color 0.3s; 

  &:hover,
  &:focus {
    border-color: green !important;  
  }
`;

export const RegisterInputPassword = styled(Input.Password)`
  height: 55px;
  color: var(--font-2);
  font-size: 18px;
  margin-bottom: 1rem;

  border-color: var(--font-2); 
  transition: border-color 0.3s; 

  &:hover,
  &:focus {
    border-color: green !important;  
  }
`;

export const ButtonSubmit = styled(Button)`
  width: 100%;
  height: 50px;
  font-size: 18px;

  background-color: green !important; 

  &:hover {
    background-color: darkgreen !important; 
`;

export const AuthrNow = styled.div`
  text-align: center;
  margin-top: 1rem;
`;

