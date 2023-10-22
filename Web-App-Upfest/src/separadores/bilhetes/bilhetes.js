import React, {useContext, useEffect, useState} from "react";
import "./bilhetes.scss";
import {
    AvisosPagamentosPendentes,
    CardFestivalAcontecer,
    CardFestivalBreve,
    ListaFestivalBreve, ListaFestivalPassados,
    SaldoCashless,
    VendaFinal
} from "../../elementos/elementos";

function Bilhetes (props){
    return (
        <div className={"Bilhetes"}>
            <AvisosPagamentosPendentes/>
            <h3>A decorrer</h3>
            <CardFestivalAcontecer/>

            <div className="divider"></div>

            <h3>Em breve</h3>
            <ListaFestivalBreve/>

            <h3>Festivais passados</h3>
            <ListaFestivalPassados/>
        </div>
    );
}

export default Bilhetes;
