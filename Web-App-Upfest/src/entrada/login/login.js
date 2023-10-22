import logo from "../logo.svg";
import "./login.scss";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { ContextoLogIn } from "./ContextLogIn";
import { Redirect } from "react-router-dom"; // Importe o Redirect

function LogIn(props) {
    const { handleSubmit, register, formState } = useForm();
    const { fazerLogIn } = useContext(ContextoLogIn);
    const [loggedIn, setLoggedIn] = useState(false); // Adicione um estado para controle de redirecionamento

    const onSubmit = (data) => {
        fazerLogIn(data);
        setLoggedIn(true);
    };

    // Verifica se há erros nas validações no form
    const checkError = (field) => {
        return formState.errors[field] ? "error" : "";
    };

    if (loggedIn) {
        return <Redirect to="/inicio" />;
    }

    return (
        <div className="LogIn">
            <img src={logo} alt="UpFest" />

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={"form-caixa"}>
                    <label>Nome</label>
                    <input className={checkError("nome")} type={"text"} placeholder={"Introduza o seu nome"} {...register("nome", {
                            required: "Verifica o preenchimento dos campos",
                            pattern: {
                                value: /^[A-Za-zÀ-ÿ~´`^ ]+$/,
                                message: "Verifica o preenchimento dos campos"
                            },
                        })}
                    />
                </div>

                <div className={"form-caixa"}>
                    <label>E-mail</label>
                    <input className={checkError("email")} type={"text"} placeholder={"Introduza o seu e-mail"} {...register("email", {
                            required: "Verifica o preenchimento dos campos",
                            pattern: {
                                value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                                message: "Verifica o preenchimento dos campos"
                            },
                        })}
                    />
                </div>

                <button className={"button"} type={"submit"}>
                    <FontAwesomeIcon icon={faRightToBracket} />
                </button>

                <div className="error-message">
                    {formState.errors["nome"]?.message || formState.errors["email"]?.message}
                </div>
            </form>
            <div className={"navegacao-inferior"}/>
        </div>
    );
}

export default LogIn;
