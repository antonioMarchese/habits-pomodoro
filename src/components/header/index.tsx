import { HeaderContainer } from "./styles";

import { Timer, Scroll, Gear } from "phosphor-react";

import logoImg from "../../assets/logo.svg";
import { NavLink } from "react-router-dom";

export function Header() {
  return (
    <HeaderContainer>
      <img src={logoImg} />
      <nav>
        <NavLink className="gear" to="/settings" title="Configurações">
          <Gear size={24} />
        </NavLink>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="Histórico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  );
}
