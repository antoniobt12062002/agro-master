import { useState } from "react";
import { IUseWrapper } from "./Wrapper.types";

export function useWrapper(): IUseWrapper{
    const [openSidebar, setOpenSidebar] = useState<boolean>(false);

    function handleOpenSidbar(value?: boolean) {
        if(value) {
            return setOpenSidebar(value);
        }
        setOpenSidebar(openSidebar => !openSidebar);
    }

    return {
        openSidebar, 
        handleOpenSidbar
    }
}