import {
  CloseMobile,
  Container,
  SidebarContent,
  SidebarItem,
  SidebarLink,
  SidebarLogo,
  SidebarTitle,
  SidebarTop
} from './Sidebar.styles';
import { CgUserlane } from 'react-icons/cg';
import { LiaMapMarkedAltSolid } from 'react-icons/lia';
import { IoIosNotificationsOutline, IoMdClose } from 'react-icons/io';
import { TbHeartRateMonitor } from 'react-icons/tb';
import { FiUser } from 'react-icons/fi';
import LogoWhite from '../../../../assets/images/agrosoil_white.svg';
import { ISidebarProps } from './Sidebar.types';
import { ContextState, IStateDataProvider } from 'app/context';
import { useContext } from 'react';
import { Avatar } from 'antd';

export function Sidebar({
  openSidebar,
  onChangeOpenSidebar
}: ISidebarProps): JSX.Element {
  const { userApi } = useContext(ContextState) as IStateDataProvider;

  return (
    <Container openSidebar={openSidebar}>
      <SidebarTop>
        <CloseMobile>
          <IoMdClose onClick={() => onChangeOpenSidebar(false)} />
        </CloseMobile>
        <SidebarLogo href='/home'>
          <img
            src={LogoWhite}
            alt=''
          />
        </SidebarLogo>
        <SidebarLink to='/user'>
          <Avatar>{userApi.userData?.name.substring(0, 2)}</Avatar>
          <SidebarTitle>{userApi.userData?.name}</SidebarTitle>
        </SidebarLink>
      </SidebarTop>
      <SidebarContent>
        <SidebarItem to='/home'>

          <SidebarTitle>Inicio</SidebarTitle>
        </SidebarItem>
        <SidebarItem to='/history'>

          <SidebarTitle>Historico</SidebarTitle>
        </SidebarItem>
        <SidebarItem to='/user'>

          <SidebarTitle>Usuário</SidebarTitle>
        </SidebarItem>
      </SidebarContent>
    </Container>
  );
}
