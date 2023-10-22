import {useParams} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import axiosFest from "../axiosFest";

import "./DetalhesFestival.scss";
import HeartFav from "../favoritos/HeartFav";

import {Bilhetes, ListaConcertos, VendaFinal} from "../elementos/elementos";
import logocinza from "../assets/icons/logo-cinza.svg";
import {ContextoFavoritos} from "../favoritos/ContextoFavoritos";

function DetalhesFestival(props) {
    const {id_evento} = useParams();

    const { isFavorito } = useContext(ContextoFavoritos);
    const favoritos = isFavorito("eventos", id_evento);
    const [detalhes, setDetalhes] = useState(null);

    useEffect(() => {
        axiosFest
            .get(`/evento/${id_evento}/detalhes`)
            .then((resultado) => setDetalhes(resultado.data.evento))
            .catch((e) => console.error(e));
    }, [id_evento]);

    if (!detalhes) {
        return (
            <div className={"sem-resultados"}>
                <img src={logocinza}/>
                <h3>Nenhuma informação encontrada.</h3>
            </div>
        );
    } else return (
        <div className={"detalhesFest"}>
                <div
                    className={"fundoFest"}
                    style={{
                        backgroundImage: `url(https://upfest.site/public/${detalhes.imagem})`,
                    }}
                >
                    <div className={"circulo-likesFest"}>
                        <HeartFav tipo="evento" id={detalhes.id} selecionado={favoritos} />
                    </div>
            </div>

            <div className={"info-fest"}>
                <div className={"infoFest"}>
                    <span>{detalhes.designacao}</span>
                    <h1 className={"date"}>{new Date(detalhes.data).toLocaleDateString("pt-PT",{
                        weekday:"long",
                        day:"numeric",
                        month: "long"
                    } )}</h1>
                    <h1>{detalhes.local}</h1>
                </div>
            </div>

            <VendaFinal/>

            <div className="divider"></div>
            <h2>Concertos</h2>
            <ListaConcertos/>

            <div className="divider"></div>
            <h2>Informações</h2>
            <div className={"sinopse"}>
                {detalhes.descricao &&
                    detalhes.descricao.split("\n").map((d, indice) => {
                        return <p key={indice}>{d}</p>;
                    })}
            </div>

            <div className="divider"></div>
            <h2>Bilhetes</h2>
            <Bilhetes/>
        </div>
    );
}


export default DetalhesFestival;
