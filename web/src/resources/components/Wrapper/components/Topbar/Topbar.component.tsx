import { Container, Logout, Title } from "./Topbar.styles";
import { HiMenu } from "react-icons/hi";
import { useTopbar } from "./useTopbar";
import { ITopbarProps } from "./Topabar.types";

export function Topbar({ onChangeOpenSidebar, title } : ITopbarProps): JSX.Element {
  const { handleLogout } = useTopbar();
  
  return (
    <Container>
      <Title>
        <HiMenu onClick={()=> onChangeOpenSidebar()} />
        {title}
      </Title>
      <Logout onClick={handleLogout}>Sair</Logout>
    </Container>
  );
}
