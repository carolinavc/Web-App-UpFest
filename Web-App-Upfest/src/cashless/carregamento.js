import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import "./cashless.scss"
function Carregamento(props) {
    return(
        <div className={"carregar"}>
            <div className={"barra-pesquisa-container"}>
                <div className="barra-pesquisar">
                    <input placeholder={"Valor a carregar"}/>
                </div>
            </div>
            <div className={"circle"}>
                <FontAwesomeIcon icon={faPlus}/>
            </div>
        </div>
    )
}

export default Carregamento;