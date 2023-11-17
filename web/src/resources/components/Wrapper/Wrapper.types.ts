export interface IWrapperProps {
  children: React.ReactNode;
  title?: string
}

export interface IUseWrapper {
  openSidebar: boolean;
  handleOpenSidbar: (value?: boolean) => void;
}
