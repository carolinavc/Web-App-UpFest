import logo from "../logo.svg";
import "./splash.scss";

import {useHistory} from "react-router-dom";
import {useEffect} from "react";

function Splash(props) {
    const historico = useHistory();

    // Redirecionar para a página de Log in após 2 segundos
    useEffect(() => {
        const timeoutId = setTimeout(() =>{
            historico.push("/login");
        }, 1000);

        // Limpa o timeout quando o componente é desmontado
        return() => clearTimeout(timeoutId);
    }, [historico]);

    return (
        <div className="Splash">
            <img src={logo} alt="UpFest"/>
            <h4>Ligando os amplificadores</h4>

            <div className={"navegacao-inferior"}/>
        </div>
    );
}

export default Splash;
