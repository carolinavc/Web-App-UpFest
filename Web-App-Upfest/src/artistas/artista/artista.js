import "../../elementos/elementos.scss"
import HeartFav from "../../favoritos/HeartFav";
import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";

function Artista(props) {

    return (<div className={"lista lista-artista"}>
        <div className={"color-block"}>
            <div className="bg-img"
                 style={{backgroundImage: `url("https://upfest.site/public/${props.imagem}")`,}}/>

            <NavLink to={`/artistas/${props.id}/detalhes`}>
                <div className={"info-artista"}>
                    <span>{props.nome}</span>
                    <h1>Artista</h1>
                </div>
            </NavLink>

            <div className="circulo-likes">
                <HeartFav isFavorito={props.isFavorito} toggleFavorito={props.toggleFavorito} id={props.id}/>
            </div>

        </div>
    </div>)
}

export default Artista;