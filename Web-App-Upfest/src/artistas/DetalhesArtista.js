import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import axiosFest from "../axiosFest";

import "./artistaDetalhes.scss";
import HeartFav from "../favoritos/HeartFav";

import {ListaConcertosArtista} from "../elementos/elementos";
import {ContextoFavoritos} from "../favoritos/ContextoFavoritos";

function DetalhesArtista(props) {
    const { id_artista } = useParams();
    const { isFavorito } = useContext(ContextoFavoritos);
    const favoritos = isFavorito("artistas", id_artista);
    const [detalhes, setDetalhes] = useState(null);

    useEffect(() => {
        axiosFest.get(`/artistas/${id_artista}/detalhes`)
            .then(resultado => setDetalhes(resultado.data.artista))
            .catch(e => console.error(e));
    }, []);

    if (!detalhes) {
        return (<h3>Loading...</h3>);

    } else return (<div className={"detalhes"}>
        <div className={"capa"}>
            <div className={"fundo"} style={{backgroundImage: `url(https://upfest.site/public/${detalhes.imagem})`}}>
                <div className={"blur"}/>

                <div className={"circulo-likes"}>
                    <HeartFav tipo="artista" id={detalhes.id} selecionado={favoritos} />
                </div>

                <div className={"info-artista"}>
                    <div className={"info"}>
                        <h1>{detalhes.nome}</h1>
                        <h3>Artista</h3>
                    </div>
                </div>

            </div>
            <img style={{backgroundImage: `url(https://upfest.site/public/${detalhes.imagem})`}}/>

        </div>

        <h4>Próximos Concertos</h4>
        <ListaConcertosArtista/>

        <div className={"sinopse"}>
            <h4>Sobre</h4>
            {detalhes.biografia && detalhes.biografia.split("\n").map((d, indice) => {
                return <p key={indice}>{d}</p>;
            })}
        </div>
    </div>);
}

export default DetalhesArtista;
