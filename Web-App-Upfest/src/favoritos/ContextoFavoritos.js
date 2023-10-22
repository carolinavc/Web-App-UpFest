import React, {createContext, useContext, useEffect, useState} from "react";
import axiosFest from "../axiosFest";
import {ContextoLogIn} from "../entrada/login/ContextLogIn";

const ContextoFavoritos = createContext({});

function ProviderFavoritos(props) {
    const [favoritos, setFavoritos] = useState({
        artista: [],
        evento: [],
        concerto: [],
    });
    const {userData} = useContext(ContextoLogIn);

    useEffect(() => {
        loadFavoritos();
    }, [userData.email]);

    const loadFavoritos = () => {
        axiosFest
            .get(`/participante/favoritos/listar?participante=${userData.email}&apenas_ids=1`)
            .then((resultado) => {
                setFavoritos({
                    artista: resultado.data.ids_favoritos.artistas || [],
                    evento: resultado.data.ids_favoritos.eventos || [],
                    concerto: resultado.data.ids_favoritos.concertos || [],
                });
            })
            .catch((e) => console.error(e));
    };

    function isFavorito(tipo, id) {
        if (favoritos && favoritos[tipo]) {
            return favoritos[tipo].includes(id);
        }
        return false;
    }

    const toggleFavorito = async (tipo, id) => {
        try {
            const endpoint = `/participante/favoritos/toggle_${tipo}`;

            const body = {
                participante: userData.email,
                [tipo]: id,
            };

            const response = await axiosFest.post(endpoint, body);

            if (response.data.favorito) {
                favoritos[tipo].push(id);
            } else {
                favoritos[tipo].splice(favoritos[tipo].indexOf(id), 1);
            }

            setFavoritos({...favoritos})

        } catch (error) {

        }
    };

    return (
        <ContextoFavoritos.Provider value={{isFavorito, toggleFavorito, favoritos}}>
            {props.children}
        </ContextoFavoritos.Provider>
    );
}

export default ProviderFavoritos;
export {ContextoFavoritos};
