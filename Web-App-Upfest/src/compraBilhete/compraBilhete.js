import React, {useEffect, useState} from "react";
import axiosFest from "../axiosFest";

import {useContext} from "react";
import {ContextoLogIn} from "../entrada/login/ContextLogIn";
import {faCheck, faX} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useParams} from "react-router-dom";

import "../compraBilhete/compraBilhete.scss"
import ticketActive from "../assets/icons/ticket-active.svg"
import infoCircle from "../assets/icons/info_circle.svg";

function ComprarBilhete({bilheteSelecionado, onClose, onConfirm}) {
    const {id_evento} = useParams();
    const {userData} = useContext(ContextoLogIn);
    const [quantidade, setQuantidade] = useState(1);
    const [bilhetes, setBilhetes] = useState([]);
    const [evento, setEvento] = useState([]);

    useEffect(() => {
        axiosFest.get(`/evento/${id_evento}/series_bilhetes/listar`)
            .then(resultado => setBilhetes(resultado.data.series))
            .catch(e => console.error(e))
    }, []);

    useEffect(() => {
        axiosFest.get(`/evento/${id_evento}/detalhes`)
            .then(resultado => setEvento(resultado.data.evento))
            .catch(e => console.error(e))
    }, []);

    const handleConfirm = () => {
        onConfirm(quantidade);
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <div className={"comprar-bilhete"}>
            <div className={"caixa"}>
                <h2>Confirmação</h2>
                <div className={"lista-bilhete"}>
                    <div className={"color-block"}>
                        <div className={"bg-img"}>
                            <img src={ticketActive}/>
                        </div>

                        <div className={"info-bilhete"}>
                            <span>{bilheteSelecionado.designacao}</span>
                            <h1 className={"date"}>
                                {new Date(bilheteSelecionado.limite_vendas).toLocaleDateString("pt-PT", {
                                    weekday: "long",
                                    day: "numeric",
                                    month: "long",
                                })}
                            </h1>

                        </div>
                        <div className={"rectangulo-preco"}>
                            <span>{bilheteSelecionado.custo},00€</span>
                        </div>
                    </div>
                </div>

                <div className={"lista"}>
                    <div className={"texto"}>
                        <h3>Estás a comprar um bilhete para o {evento.designacao}. Verifica os teus dados e clica em
                            “Confirmar” para gerar uma referência de pagamento.</h3>
                    </div>

                    <div className={"info_utilizador"}>
                        <div className={"linha"}>
                            <h3>Nome</h3>
                            <h3>{userData.nome}</h3>
                        </div>
                        <div className={"linha"}>
                            <h3>E-mail</h3>
                            <h3>{userData.email}</h3>
                        </div>
                    </div>
                </div>

                <div className={"botoes"}>
                    <div className={"confirmar"} onClick={handleConfirm}>
                        <div className={"info"}>
                            <FontAwesomeIcon icon={faCheck}/>
                            <h3>Confirmar</h3>
                        </div>
                    </div>

                    <div className={"close"} onClick={handleClose}>
                        <FontAwesomeIcon icon={faX}/>
                    </div>
                </div>
            </div>
        </div>);
}

export default ComprarBilhete;

export function ErroCompra(props){
    return(
        <div className={"fundoRed"}>
            <h3>Ocorreu um erro ao registar a compra</h3>
            <img src={infoCircle}/>
        </div>
    )
}
export function SucessoCompra(props){
    return(
        <div className={"fundoGreen"}>
            <h3>Compra registada com sucesso</h3>
            <FontAwesomeIcon icon={faCheck}/>
        </div>
    )
}
