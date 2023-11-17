export interface ITopbarProps {
    onChangeOpenSidebar: (value?: boolean)=> void;
    title?: string;
}
export interface IUseTopbar {
    handleLogout: () => void;
}
