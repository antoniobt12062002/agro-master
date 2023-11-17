import { ReactNode } from 'react';

import { Sidebar, Topbar } from './components';
import { useWrapper } from './useWrapper';

import {
  Container,
  WrapperContainer,
  WrapperContent,
  WrapperFooter,
  WrapperMain
} from './Wrapper.styles';
import { IWrapperProps } from './Wrapper.types';

export function Wrapper({ children, title }: IWrapperProps): JSX.Element {
  const { openSidebar, handleOpenSidbar } = useWrapper();

  return (
    <Container>
      <WrapperContainer>
        <Sidebar
          openSidebar={openSidebar}
          onChangeOpenSidebar={handleOpenSidbar}
        />
        <WrapperContent>
          <Topbar onChangeOpenSidebar={handleOpenSidbar} title={title} />
          <WrapperMain>{children}</WrapperMain>
          <WrapperFooter>Antonio Tanahashi | ©2023</WrapperFooter>
        </WrapperContent>
      </WrapperContainer>
    </Container>
  );
}
