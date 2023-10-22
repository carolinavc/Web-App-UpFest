import "./pesquisa.scss";
import {useState} from "react";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";

import {ListaFestival, ListaArtista} from "../../elementos/elementos";


function Pesquisa(props) {
    const [filtro, setFiltro] = useState("");

    return <div className={"Pesquisa"}>
        <div className={"barra-pesquisa-container"}>
            <div className="barra-pesquisar">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="icone-pesquisa"/>
                <input placeholder={"Encontre um festival ou artista"} value={filtro}
                       onChange={(e) => {
                           setFiltro(e.target.value);
                       }}/>
            </div>
        </div>

        <h3>Festivais</h3>
        <ListaFestival filtro={filtro}/>

        <h3>Artistas</h3>
        <ListaArtista filtro={filtro}/>
    </div>
}

export default Pesquisa;