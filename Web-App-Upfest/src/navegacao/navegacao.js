import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./navegacao.scss";

import home from "../assets/icons/home.svg";
import search from "../assets/icons/search.svg";
import ticket from "../assets/icons/ticket.svg";
import user from "../assets/icons/user.svg";

import homeActive from "../assets/icons/home-active.svg";
import searchActive from "../assets/icons/search-active.svg";
import ticketActive from "../assets/icons/ticket-active.svg";
import userActive from "../assets/icons/user-active.svg";

function Navegacao(props) {
    const location = useLocation();
    const [activeIcon, setActiveIcon] = useState("inicio");

    const handleIconClick = (iconName) => {
        setActiveIcon(iconName);
    };

    // Verifica se estamos em uma página que não precisa da barra de navegação
    const isLoginPage = location.pathname === "/login";
    const isSplashPage = location.pathname === "/";

    // Renderize nulo nas páginas de login e splash
    if (isLoginPage || isSplashPage) {
        return null;
    }

    return (
        <div className={"navegacao"}>
            <div className={"navegacao-icons"}>
                <NavLink to={"/inicio"}>
                    <img
                        src={activeIcon === "inicio" ? homeActive : home}
                        onClick={() => handleIconClick("inicio")}
                    />
                </NavLink>
                <NavLink to={"/pesquisa"}>
                    <img
                        src={activeIcon === "pesquisa" ? searchActive : search}
                        onClick={() => handleIconClick("pesquisa")}
                    />
                </NavLink>
                <NavLink to={"/bilhetes"}>
                    <img
                        src={activeIcon === "bilhetes" ? ticketActive : ticket}
                        onClick={() => handleIconClick("bilhetes")}
                    />
                </NavLink>
                <NavLink to={"/pessoal"}>
                    <img
                        src={activeIcon === "pessoal" ? userActive : user}
                        onClick={() => handleIconClick("pessoal")}
                    />
                </NavLink>
            </div>
        </div>
    );
}

export default Navegacao;
