
import Cookies from "js-cookie";
import { IUseTopbar } from "./Topabar.types";
import { HttpAuth } from "../../../../../app/data/api/config/Http";

export function useTopbar(): IUseTopbar {
  async function handleLogout() : Promise<void> {
    Cookies.remove("access-token", { path: "/", domain: window.location.hostname });
    localStorage.removeItem("primaryLogin");
    await HttpAuth.get("/user/logout")
      .then((res) => {
        if (res.status === 200) window.location.href = "/";
      })
      .then((res:any) => {
        if (res.status) {
          window.location.href = "/";
        }
      });
  }

  return {
    handleLogout
  }
}
