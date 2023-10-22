import React, {useContext, useEffect, useState} from 'react';

import axiosFest from "../axiosFest.js";
import {NavLink, useParams} from "react-router-dom";

import "./elementos.scss"

import ticket from "../assets/icons/ticket-active.svg";
import QR from "../assets/icons/qr.svg";
import cash from "../assets/icons/cash.svg";
import logocinza from "../assets/icons/logo-cinza.svg";
import info from "../assets/icons/info.svg";
import card from "../assets/icons/card.svg";
import heart from "../assets/icons/heart_open.svg"
import infoCircle from "../assets/icons/info_circle_orange.svg"

import HeartFav from "../favoritos/HeartFav";
import {faArrowLeft, faArrowRight, faCheck} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ContextoFavoritos} from "../favoritos/ContextoFavoritos";

import ComprarBilhete from "../compraBilhete/compraBilhete";
import {ErroCompra, SucessoCompra} from "../compraBilhete/compraBilhete";
import {ContextoLogIn} from "../entrada/login/ContextLogIn";
import axios from "axios";

// Card
export function CardFestival(props) {
    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        axiosFest.get(`/evento/listar?numero_resultados=3`)
            .then(resultado => setEventos(resultado.data.eventos))
            .catch(e => console.error(e));
    }, []);

    if (!eventos) {
        return <h3>Loading...</h3>
    } else return (
        <div>
            {eventos.map(evento => (
                <div key={evento.id} className="card card-festival">

                    <div className="bg-img"
                         style={{backgroundImage: `url("https://upfest.site/public/${evento.imagem}")`}}/>
                    <div className="color-block"></div>


                    <div className="info-festival">
                        <span>{evento.designacao}</span>

                        <h1 className={"date"}>{new Date(evento.data).toLocaleDateString("pt-PT", {
                            weekday: "long",
                            day: "numeric",
                            month: "long"
                        })}</h1>
                        <h1>{evento.local}</h1>

                        <div className="extras">
                            <div className="rectangulo-preco">
                                <span>{evento.preco_desde}, 00€</span>
                            </div>

                            <div className="circulo-likes">
                                <img src={ticket}/>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
} // a funcionar
export function CardFestivalBreve(props) {
    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        axiosFest.get(`/participante/bilhetes/listar?participante=joao.sousa@gmail.com`)
            .then(resultado => setEventos(resultado.data.futuros))
            .catch(e => console.error(e));
    }, []);

    if (!eventos) {
        return <h3>Loading...</h3>
    } else return (
        <div>
            {eventos.map(evento => (
                <div key={evento.id} className="card card-festival">
                    <div className="bg-img"
                         style={{backgroundImage: `url("https://upfest.site/public/${evento.imagem_evento}")`}}/>
                    <div className="color-block"></div>

                    <div className="info-festival">
                        <span>{evento.evento}</span>

                        <h1 className={"date"}>{new Date(evento.data).toLocaleDateString("pt-PT", {
                            weekday: "long",
                            day: "numeric",
                            month: "long"
                        })}</h1>

                        <h1>{evento.local}</h1>

                        <div className="extras">
                            <div className="rectangulo-preco">
                                <span>35,00 €</span>
                            </div>

                            <div className="circulo-likes">
                                <HeartFav isFavorito={evento.isFavorito} toggleFavorito={evento.toggleFavorito}
                                          id={eventos.id}/>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
} // a funcionar
export function CardFestivalAcontecer(props) {
    const {participante} = useParams();
    const {userData} = useContext(ContextoLogIn);

    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        axiosFest.get(`/participante/bilhetes/listar?participante=${userData.email}`)
            .then(resultado => setEventos(resultado.data.atuais))
            .catch(e => console.error(e));
    }, [participante]);

    if (eventos.length === 0) {
        return (
            <div className={"sem-resultados"}>
                <img src={logocinza}/>
                <h3>Nenhum festival a decorrer.</h3>
            </div>
        );
    }

    if (!eventos) {
        return <h3>Loading...</h3>
    }
    return (
        <div>
            {eventos.map(evento => (
                <div key={evento.id} className="card card-festival-acontecer">
                    <div className="bg-img"
                         style={{backgroundImage: `url("https://upfest.site/public/${evento.imagem_evento}")`}}/>

                    <div className={"color-block"}></div>

                    <div className={"rectangulo-status"}>
                        <span>a acontecer</span>
                    </div>

                    <div className={"info-festival"}>
                        <span>{evento.evento}</span>

                        <h1 className={"date"}>{new Date(evento.data_evento).toLocaleDateString("pt-PT", {
                            weekday: "long",
                            day: "numeric",
                            month: "long"
                        })}</h1>

                        <h1>{evento.local}</h1>
                    </div>
                    <div className="extras"></div>
                </div>
            ))}
            <VendaFinal/>
            <SaldoCashless/>
        </div>)
} // a funcionar

//Listas
export function ListaFestival(props) {
    const {location} = props;
    const {isFavorito} = useContext(ContextoFavoritos);

    const {ListaFestivalIdx, filtro} = props;
    const filtroLowerCase = filtro ? filtro.toLowerCase() : ""; // Garanta que filtro é uma string em minúsculas

    const [eventos, setEventos] = useState([]);
    const [filtroEventos, setFiltroEventos] = useState([]); // Estado para armazenar os eventos filtrados

    useEffect(() => {
        const searchParams = filtro ? `&pesquisa=${filtro}` : "";
        axiosFest
            .get(`/evento/listar?numero_resultados=3&${searchParams}`)
            .then((resultado) => {
                setEventos(resultado.data.eventos);
                setFiltroEventos(resultado.data.eventos); // Define os eventos filtrados inicialmente
            })
            .catch((e) => console.error(e));
    }, [filtro]);

    // Função para filtrar os eventos com base no filtro de pesquisa
    useEffect(() => {
        const eventosFiltrados = eventos.filter((evento) =>
            evento.designacao.toLowerCase().includes(filtroLowerCase)
        );
        setFiltroEventos(eventosFiltrados);
    }, [filtro, eventos]);

    if (filtroEventos.length === 0) {
        return (
            <div className={"sem-resultados"}>
                <img src={logocinza} alt="Logo Cinza"/>
                <h3>Nenhum festival encontrado.</h3>
            </div>
        );
    }

    return (
        <div>
            {filtroEventos.map((evento) => (
                <div key={evento.id} className="lista lista-evento">
                    <div className="color-block">
                        <div
                            className="bg-img"
                            style={{
                                backgroundImage: `url("https://upfest.site/public/${evento.imagem}")`,
                            }}
                        />

                        <NavLink to={`/evento/${evento.id}/detalhes`}>
                            <div className={"info-festival"}>
                                <span>{evento.designacao}</span>

                                <h1 className={"date"}>
                                    {new Date(evento.data).toLocaleDateString("pt-PT", {
                                        weekday: "long",
                                        day: "numeric",
                                        month: "long",
                                    })}
                                </h1>

                                <h1>{evento.local}</h1>
                            </div>
                        </NavLink>

                        <div className="circulo-likes">
                            <HeartFav tipo="evento" id={evento.id}/>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
} // a funcionar
export function ListaFestivalBreve(props) {
    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        axiosFest
            .get(`/evento/listar?apenas_futuros=1&numero_resultados=6`)
            .then((resultado) => {
                setEventos(resultado.data.eventos);
            })
            .catch((e) => console.error(e));
    }, []);

    if (eventos.length === 0) {
        return (
            <div className={"sem-resultados"}>
                <img src={logocinza} alt="Logo Cinza"/>
                <h3>Nenhum festival encontrado.</h3>
            </div>
        );
    }

    return (
        <div>
            {eventos.map((evento) => (
                <div key={evento.id} className="lista lista-evento">
                    <div className="color-block">
                        <div
                            className="bg-img"
                            style={{
                                backgroundImage: `url("https://upfest.site/public/${evento.imagem}")`,
                            }}
                        />

                        <NavLink to={`/evento/${evento.id}/detalhes`}>
                            <div className={"info-festival"}>
                                <span>{evento.designacao}</span>

                                <h1 className={"date"}>
                                    {new Date(evento.data).toLocaleDateString("pt-PT", {
                                        weekday: "long",
                                        day: "numeric",
                                        month: "long",
                                    })}
                                </h1>

                                <h1>{evento.local}</h1>
                            </div>
                        </NavLink>

                        <div className="circulo-likes">
                            <img
                                src={ticket}
                            />
                        </div>
                    </div>
                </div>
            ))}

        </div>
    );
} // a funcionar
export function ListaFestivalPassados(props) {
    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        axiosFest
            .get(`/participante/bilhetes/listar?participante=joao.sousa@gmail.com`)
            .then((resultado) => {
                setEventos(resultado.data.passados);
            })
            .catch((e) => console.error(e));
    }, []);

    if (eventos.length === 0) {
        return (
            <div className={"sem-resultados"}>
                <img src={logocinza}/>
                <h3>Nenhum festival encontrado.</h3>
            </div>
        );
    }

    if (!eventos) {
        return <h3>Loading ...</h3>
    } else return (
        <div>
            {eventos.map((evento) => (
                <div key={evento.id} className="lista lista-evento">
                    <div className="color-block">
                        <div className="bg-img"
                             style={{backgroundImage: `url("https://upfest.site/public/${evento.imagem_evento}")`,}}/>

                        <NavLink to={`/evento/${evento.id}/detalhes`}>
                            <div className={"info-festival"}>
                                <span>{evento.evento}</span>

                                <h1 className={"date"}>{new Date(evento.data_evento).toLocaleDateString("pt-PT", {
                                    weekday: "long",
                                    day: "numeric",
                                    month: "long"
                                })}</h1>

                                <h1>{evento.local}</h1>
                            </div>
                        </NavLink>

                        <div className="circulo-likes">
                            <img src={info}/>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
} // a funcionar
export function ListaArtista(props) {
    const {location} = props;
    const {isFavorito} = useContext(ContextoFavoritos);

    const {filtro} = props;
    const [todosArtistas, setTodosArtistas] = useState([]); // Lista de todos os artistas
    const [filtroArtistas, setFiltroArtistas] = useState([]); // Lista de artistas exibidos

    useEffect(() => {
        const searchParams = filtro ? `&pesquisa=${filtro}` : "";
        axiosFest
            .get(`/artistas/listar?numero_resultados=4${searchParams}`)
            .then((resultado) => {
                const artistas = resultado.data.artistas;
                setTodosArtistas(artistas);
                setFiltroArtistas(artistas.slice(0, 4));
            })
            .catch((e) => console.error(e));
    }, [filtro]);

    if (filtroArtistas.length === 0) {
        return (
            <div className={"sem-resultados"}>
                <img src={logocinza} alt="Logo Cinza"/>
                <h3>Nenhum artista encontrado.</h3>
            </div>
        );
    }

    if (!filtroArtistas) {
        return <h3>Loading...</h3>;
    } else
        return (
            <div>
                {filtroArtistas.map(artista => (
                    <div key={artista.id} className={"lista lista-artista"}>

                        <div className={"color-block"}>

                            <div className="bg-img"
                                 style={{backgroundImage: `url("https://upfest.site/public/${artista.imagem}")`,}}/>

                            <NavLink to={`/artistas/${artista.id}/detalhes`}
                                     state={{isFavorito: isFavorito("artistas", artista.id)}}>
                                <div className={"info-artista"}>
                                    <span>{artista.nome}</span>
                                    <h1>Artista</h1>
                                </div>
                            </NavLink>

                            <div className="circulo-likes">
                                <HeartFav tipo="artista" id={artista.id}/>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        );
}// a funcionar
export function ListaConcertosArtista(props) {
    const {id_artista} = useParams();
    const [concertos, setConcertos] = useState([]);

    useEffect(() => {
        axiosFest.get(`/artistas/${id_artista}/concertos`)
            .then(resultado => setConcertos(resultado.data.concertos))
            .catch(e => console.error(e))
    }, []);

    if (!concertos) {
        return <h3>Loading...</h3>;

    } else return (<div> {concertos.map(concerto => (
            <div key={concerto.id} className={"lista lista-evento"}>

                <div className={"color-block"}>

                    <div className="bg-img"
                         style={{backgroundImage: `url("https://upfest.site/public/${concerto.imagem}")`}}/>

                    <div className={"info-festival"}>
                        <span>{concerto.evento}</span>

                        <h1 className={"date"}>{new Date(concerto.data_hora_inicio).toLocaleDateString("pt-PT", {
                            weekday: "long",
                            day: "numeric",
                            month: "long"
                        })}</h1>

                        <h1>{concerto.palco}</h1>
                    </div>

                    <div className="circulo-likes">
                        <HeartFav tipo="concertos" id={concerto.id}/>
                    </div>

                </div>
            </div>
        ))}
        </div>
    );
} // a funcionar
export function ListaConcertos(props) {
    const {id_evento} = useParams();
    const [concertos, setConcertos] = useState([]);
    const [pagina, setPagina] = useState(0);
    const [concertosProxima, setConcertosProxima] = useState([]);

    useEffect(() => {
        axiosFest
            .get(`evento/${id_evento}/concertos/listar`, {params: {pagina: pagina}})
            .then((resultado) => setConcertos(resultado.data.concertos))
            .catch((e) => console.error(e));

        axiosFest
            .get(`evento/${id_evento}/concertos/listar`, {params: {pagina: pagina + 1}})
            .then((resultado) => setConcertosProxima(resultado.data.concertos))
            .catch((e) => console.error(e));
    }, [pagina]);

    if (concertos.length === 0) {
        return (
            <div className={"sem-resultados"}>
                <img src={logocinza} alt="Logo Cinza"/>
                <h3>Evento sem concertos</h3>
            </div>
        );
    }

    if (!concertos) {
        return <h3>Loading...</h3>;
    }

    let e_ultima_pagina = concertosProxima.length === 0;
    const estilos_desativado = {opacity: 0.5, pointerEvents: "none", filter: "saturate(0)"};
    const pagina_unica = concertosProxima.length === 0;

    return (
        <div>
            {concertos.map((concerto) => (
                <div key={concerto.id} className={"lista lista-concerto"}>
                    <div className={"color-block"}>
                        <div
                            className="bg-img"
                            style={{backgroundImage: `url("https://upfest.site/public/${concerto.imagem}")`}}
                        />

                        <div className={"info-concerto"}>
                            <span>{concerto.artista}</span>

                            <h1 className={"date"}>
                                {new Date(concerto.data_hora_inicio).toLocaleDateString("pt-PT", {
                                    weekday: "long",
                                    day: "numeric",
                                    month: "long",
                                })}
                            </h1>

                            <h1>{concerto.palco}</h1>
                        </div>

                        <div className="circulo-likes">
                            <HeartFav tipo="concertos" id={concerto.id}/>
                        </div>
                    </div>
                </div>
            ))}

            <div className={"paginacao"}>
                <div onClick={() => setPagina(pagina - 1)} style={pagina === 0 ? estilos_desativado : {}}>
                    <div className={"fundo"}>
                        <FontAwesomeIcon icon={faArrowLeft}/>
                    </div>
                </div>
                {pagina + 1}
                <div
                    onClick={() => setPagina(pagina + 1)} style={e_ultima_pagina ? estilos_desativado : {}}
                >
                    <div className={"fundo"}>
                        <FontAwesomeIcon icon={faArrowRight}/>
                    </div>
                </div>
            </div>
        </div>
    );
}// a funcionar

// Venda
export function VendaFinal({id_evento}) {
    const {userData} = useContext(ContextoLogIn);

    return (
        <div className={"venda venda-final"}>
            <NavLink to={`/cashless/${id_evento}/saldo?participante=${userData.email}`}>
                <div className={"color-block"}>
                    <div className={"linha-pagamento"}>
                        <img src={ticket}/>
                        <h1>Venda Final</h1>
                    </div>
                    <img src={QR}/>
                </div>
            </NavLink>
        </div>
    );
}
export function SaldoCashless(props) {
    return (<div className={"venda saldo-cashless"}>
        <div className={"color-block"}>

            <div className={"linha-pagamento"}>
                <img src={cash}/>
                <h1>Saldo Cashless</h1>
            </div>
            <h1>0,00 €</h1>
        </div>
    </div>);
}

// Bilhetes
export function Bilhetes(props) {
    const {id_evento, id_serie} = useParams();
    const [bilhetes, setBilhetes] = useState([]);
    const [mostrarCaixa, setMostrarCaixa] = useState(false);
    const [detalhesBilhete, setDetalhesBilhete] = useState(null);
    const [idEventoCompra, setIdEventoCompra] = useState(null);
    const {userData} = useContext(ContextoLogIn);
    const [mostrarErro, setMostrarErro] = useState(false);
    const [mostrarSucesso, setMostrarSucesso] = useState(false);

    useEffect(() => {
        axiosFest
            .get(`/evento/${id_evento}/series_bilhetes/listar`)
            .then((resultado) => setBilhetes(resultado.data.series))
            .catch((e) => console.error(e));
    }, []);

    const handleMostrarCaixa = (bilhete, idEvento) => {
        setMostrarCaixa(true);
        setDetalhesBilhete(bilhete);
        setIdEventoCompra(idEvento);
    };

    const comprarBilhete = async (serie) => {
        try {
            const pedido = {
                evento: id_evento,
                nome: userData.nome,
                email: userData.email,
                serie: serie.id
            };

            console.log("Pedido", pedido);

            const response = await axiosFest.post(`vendas/bilhetes/comprar`, pedido);
            if (response.status === 200) {
                console.log("Compra de bilhetes bem-sucedida");
                setMostrarSucesso(true);
            } else {
                console.error("Erro ao comprar bilhetes:", response.data);
                setMostrarErro(true);
            }
        } catch (error) {
            console.error("Erro ao comprar bilhetes:", error);
            setMostrarErro(true);
        } finally {
            setMostrarCaixa(false);
        }
    };

    return (
        <div>
            {bilhetes.map((bilhete) => (
                <div
                    key={bilhete.id}
                    className={`lista lista-bilhete ${
                        bilhete.disponivel ? "" : "indisponivel"
                    }`}
                >
                    <div className="color-block">
                        <div className="bg-img">
                            <img src={ticket} alt="Imagem do bilhete"/>
                        </div>

                        <div className="info-bilhete">
                            <span>{bilhete.designacao}</span>
                            <h1>
                                {bilhete.disponivel ? "Disponível" : "Indisponível"}
                            </h1>
                        </div>

                        <div
                            className="rectangulo-preco"
                            onClick={() => handleMostrarCaixa(bilhete, id_evento)}
                        >
                            <button className="botao-preco">
                                {bilhete.custo},00 €
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            {mostrarCaixa && (
                <ComprarBilhete
                    bilheteSelecionado={detalhesBilhete}
                    id_evento={idEventoCompra}
                    onClose={() => setMostrarCaixa(false)}
                    onConfirm={() => comprarBilhete(detalhesBilhete)}
                />
            )}

            {mostrarErro && <ErroCompra/>}
            {mostrarSucesso && <SucessoCompra/>}
        </div>
    );
} // a funcionar

// Outros pagamentos
export function OutrosPagamentos(props) {
    const [pagamentos, setPagamentos] = useState([]);

    const [pagina, setPagina] = useState(0);
    const [pagamentosProxima, setPagamentosProxima] = useState([]);

    const {userData} = useContext(ContextoLogIn);

    useEffect(() => {
        axiosFest.get(`/participante/pagamentos/listar?participante=${userData.email}&estado=PAGO`, {params: {pagina: pagina},})
            .then(resultado => setPagamentos(resultado.data.pagamentos))
            .catch(e => console.error(e))

        axiosFest
            .get(`/participante/pagamentos/listar?participante=${userData.email}&estado=PAGO`, {params: {pagina: pagina + 1},})
            .then((resultado) => setPagamentosProxima(resultado.data.pagamentos))
            .catch((e) => console.error(e));
    }, [pagina]);

    const estilos_desativado = {opacity: 0.5, pointerEvents: "none", filter: "saturate(0)"};
    let e_ultima_pagina = pagamentosProxima.length === 0;


    if (pagamentos.length === 0) {
        return (
            <div className={"sem-resultados"}>
                <img src={logocinza} alt="Logo Cinza"/>
                <h3>Sem pagamentos</h3>
            </div>
        );
    }

    if (!pagamentos) {
        return <h3>Loading...</h3>;
    } else {
        return (
            <div>
                {pagamentos.map(pagamento => (
                    <div key={pagamento.id} className={"lista lista-pagamento"}>
                        <div className="color-block">
                            <div className="bg-img">
                                <img src={card}/>
                            </div>

                            <div className="info-pagamento">
                                <span>{pagamento.tipo}</span>
                                <h1>{pagamento.estado}</h1>

                                <h1 className={"date"}>{new Date(pagamento.data_compra).toLocaleDateString("pt-PT", {
                                    weekday: "long",
                                    day: "numeric",
                                    month: "long"
                                })}</h1>

                            </div>

                            <div className="rectangulo-preco">
                                <span>{pagamento.valor}, 00 €</span>
                            </div>
                        </div>
                    </div>
                ))}

                <div className={"paginacao"}>
                    <div onClick={() => setPagina(pagina - 1)} style={pagina === 0 ? estilos_desativado : {}}>
                        <div className={"fundo"}>
                            <FontAwesomeIcon icon={faArrowLeft}/>
                        </div>
                    </div>
                    {pagina + 1}
                    <div
                        onClick={() => setPagina(pagina + 1)} style={e_ultima_pagina ? estilos_desativado : {}}
                    >
                        <div className={"fundo"}>
                            <FontAwesomeIcon icon={faArrowRight}/>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
} // a funcionar
export function PagamentosPendentes(props) {
    const [pagamentosPendentes, setPagamentosPendentes] = useState([]);
    const {userData} = useContext(ContextoLogIn);

    useEffect(() => {
        axiosFest.get(`/participante/pagamentos/listar?participante=${userData.email}&estado=PAGAMENTO_PENDENTE`)
            .then((resultado) => setPagamentosPendentes(resultado.data.pagamentos))
            .catch((e) => console.error(e));
    }, []);

    if (!pagamentosPendentes || pagamentosPendentes.length === 0) {
        return (
            <div className="sem-resultados">
                <img src={logocinza} alt="Logo Cinza"/>
                <h3>Sem pagamentos pendentes</h3>
            </div>
        );
    }

    if (!pagamentosPendentes) {
        return <h3>Loading...</h3>;
    }

    return (
        <div className="pagamentoPendente">
            {pagamentosPendentes.map((pagamento) => (
                <div key={pagamento.id}>
                    {/* Elemento lista-pagamento-pendente */}
                    <div className="lista lista-pagamento-pendente">
                        <div className="color-block">
                            <div className="bg-img">
                                <img src={card}/>
                            </div>

                            <div className="info-pagamento">
                                <span>{pagamento.tipo}</span>
                                <h1>{pagamento.estado.slice(10)}</h1>

                                <h1 className="date">
                                    {new Date(pagamento.data_compra).toLocaleDateString("pt-PT", {
                                        weekday: "long",
                                        day: "numeric",
                                        month: "long",
                                    })}
                                </h1>
                            </div>

                            <div className="rectangulo-preco">
                                <span>{pagamento.valor}, 00 €</span>
                            </div>
                        </div>
                    </div>

                    {/* Elemento detalhes-pagamento */}
                    <div className="lista detalhes-pagamento">
                        <div className="color-block">
                            <div className="referencia">
                                <div className="linha-pagamento">
                                    <h1>Entidade:</h1>
                                    <h1>{pagamento.entidade}</h1>
                                </div>
                                <div className="linha-pagamento">
                                    <h1>Referência:</h1>
                                    <h1>{pagamento.referencia}</h1>
                                </div>
                                <div className="linha-pagamento">
                                    <h1>Valor:</h1>
                                    <h1>{pagamento.valor},00€</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
} // a funcionar

// Avisos
export function AvisosPagamentosPendentes(props) {
    const [avisoPagamentos, setAvisoPagamentos] = useState([]);
    const {userData} = useContext(ContextoLogIn);

    useEffect(() => {
        axiosFest.get(`/participante/pagamentos/listar?participante=${userData.email}&estado=PAGAMENTO_PENDENTE`)
            .then((resultado) => setAvisoPagamentos(resultado.data.pagamentos))
            .catch((e) => console.error(e));
    }, []);

    if (!avisoPagamentos || avisoPagamentos.length === 0) {
        return (
            null
        );
    }

    return (
        <div className={"aviso"}>
            <div className={"color-block"}>
                <div className={"linha-pagamento"}>
                    <img src={infoCircle}/>
                    <h1>Existem pagamentos pendentes na tua conta</h1>
                </div>
            </div>
        </div>
    );
} // a funcionar
