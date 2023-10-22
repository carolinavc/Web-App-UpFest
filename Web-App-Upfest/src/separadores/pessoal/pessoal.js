import "./pessoal.scss";
import {AvisosPagamentosPendentes, OutrosPagamentos, PagamentosPendentes} from "../../elementos/elementos";
import Favoritos from "../../favoritos/Favoritos";
import React from "react";

function Pessoal (props){
    return <div className={"Pessoal"}>
        <AvisosPagamentosPendentes/>

        <h3>Favoritos</h3>
        <Favoritos/>

        <h3>Pagamentos Pendentes</h3>
       <PagamentosPendentes/>

        <h3>Outros Pagamentos</h3>
        <OutrosPagamentos/>
    </div>

}

export default Pessoal;