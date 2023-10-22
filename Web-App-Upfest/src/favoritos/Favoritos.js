import React, { useContext, useEffect, useState } from "react";
import { ContextoFavoritos } from "./ContextoFavoritos";
import logocinza from "../assets/icons/logo-cinza.svg";
import { NavLink } from "react-router-dom";
import HeartFav from "./HeartFav";
import axiosFest from "../axiosFest";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "../elementos/elementos.scss";
import { ContextoLogIn } from "../entrada/login/ContextLogIn";

function Favoritos(props) {
    const { favoritos: contextFavoritos } = useContext(ContextoFavoritos);
    const { userData } = useContext(ContextoLogIn);
    const [favoritos, setFavoritos] = useState([]);
    const [pagina, setPagina] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [favoritosProxima, setFavoritosProxima] = useState([]);

    const itemsPerPage = 3;

    useEffect(() => {
        axiosFest
            .get(`/participante/favoritos/listar?participante=${userData.email}`, {
                params: { pagina: pagina },
            })
            .then((resultado) => {
                setFavoritos(resultado.data.favoritos);
                setTotalPages(Math.ceil(resultado.data.favoritos.length / itemsPerPage));
            })
            .catch((e) => console.error(e));

        axiosFest
            .get(`/participante/favoritos/listar?participante=${userData.email}`, {
                params: { pagina: pagina + 1 },
            })
            .then((resultado) => setFavoritosProxima(resultado.data.favoritos))
            .catch((e) => console.error(e));
    }, [pagina, userData.email, contextFavoritos]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            axiosFest
                .get(`/participante/favoritos/listar?participante=${userData.email}`, {
                    params: {pagina: pagina},
                })
                .then((resultado) => {
                    setFavoritos(resultado.data.favoritos);
                    setTotalPages(Math.ceil(resultado.data.favoritos.length / itemsPerPage));
                })
                .catch((e) => console.error(e));
        }, 500);

        return () => {
            clearTimeout(timeout);
        };
    }, [pagina, userData.email, contextFavoritos]);

    const estilos_desativado = {
        opacity: 0.5,
        pointerEvents: "none",
        filter: "saturate(0)",
    };
    let e_ultima_pagina = favoritosProxima.length === 0;

    if (favoritos.length === 0) {
        return (
            <div className="sem-resultados">
                <img src={logocinza} alt="Logo Cinza" />
                <h3>Sem favoritos</h3>
            </div>
        );
    }

    return (
        <div>
            {favoritos.map((favorito) => (
                <div key={favorito.id} className={"lista lista-" + favorito.tipo}>
                    <div className={"color-block"}>
                        <div
                            className="bg-img"
                            style={{
                                backgroundImage: `url("https://upfest.site/public/${favorito.imagem}")`,
                            }}
                        />
                        {favorito.tipo === "artista" && (
                            <NavLink to={`/artistas/${favorito.id}/detalhes`}>
                                <div className={"info-artista"}>
                                    <span>{favorito.nome}</span>
                                    <h1>Artista</h1>
                                </div>
                            </NavLink>
                        )}

                        {favorito.tipo === "evento" && (
                            <NavLink to={`/evento/${favorito.id}/detalhes`}>
                                <div className={"info-festival"}>
                                    <span>{favorito.nome}</span>
                                    <h1 className={"date"}>
                                        {new Date(favorito.data).toLocaleDateString("pt-PT", {
                                            weekday: "long",
                                            day: "numeric",
                                            month: "long",
                                        })}
                                    </h1>
                                    <h1>{favorito.local}</h1>
                                </div>
                            </NavLink>
                        )}

                        <div className="circulo-likes">
                            <HeartFav tipo={favorito.tipo} id={favorito.id} />
                        </div>
                    </div>
                </div>
            ))}
            <div>
                <div className={"paginacao"}>
                    <div
                        onClick={() => setPagina(pagina - 1)}
                        style={pagina === 0 ? estilos_desativado : {}}
                    >
                        <div className={"fundo"}>
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </div>
                    </div>
                    {pagina + 1}
                    <div
                        onClick={() => setPagina(pagina + 1)}
                        style={e_ultima_pagina ? estilos_desativado : {}}
                    >
                        <div className={"fundo"}>
                            <FontAwesomeIcon icon={faArrowRight} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Favoritos;
