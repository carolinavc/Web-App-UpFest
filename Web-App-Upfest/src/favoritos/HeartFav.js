import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { ContextoFavoritos } from "./ContextoFavoritos";

function HeartFav({ tipo, id }) {
    const { toggleFavorito, isFavorito } = useContext(ContextoFavoritos);

    const itemEhFavorito = isFavorito(tipo, id);

    const handleToggleFavorito = () => {
        toggleFavorito(tipo, id);
    };

    return (
        <FontAwesomeIcon
            onClick={handleToggleFavorito}
            icon={itemEhFavorito ? faHeartSolid : faHeart}
        />
    );
}

export default HeartFav;
