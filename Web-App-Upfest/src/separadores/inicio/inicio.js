import "./inicio.scss";

import {VendaFinal, SaldoCashless, CardFestivalAcontecer, CardFestival} from "../../elementos/elementos";

import { useContext } from "react";
import { ContextoLogIn} from "../../entrada/login/ContextLogIn";


function Inicio() {
    const { userData } = useContext(ContextoLogIn);
    const nomeCompleto = userData.nome;

    const palavras = nomeCompleto.split(" ");
    const primeiroNome = palavras[0];

    return <div className={"Inicio"}>
        <h3>Olá {primeiroNome}</h3>
        <CardFestivalAcontecer/>
        
        <h3>Sugestões</h3>
        <CardFestival/>
    </div>

}

export default Inicio;