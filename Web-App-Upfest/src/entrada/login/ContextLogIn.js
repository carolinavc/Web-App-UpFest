import React, {createContext, useState} from "react";

const ContextoLogIn = createContext({});

function ProvideLogIn (props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUsarData] = useState({nome: "", email: ""})

    const fazerLogIn = (data) => {
        const nome = data.nome;
        const email = data.email;

        console.log(data)

        if (!nome || !email) {
            alert("Verifique o preenchimento dos campos");
        } else {
            setIsLoggedIn(true);
            setUsarData({ nome, email });
        }
    };

    const fazerLogOut = () => {
        setIsLoggedIn(false);
    };

    return (
        <ContextoLogIn.Provider value={{ isLoggedIn, userData, fazerLogIn, fazerLogOut }}>
            {props.children}
        </ContextoLogIn.Provider>
    );
}

export default ProvideLogIn;
export {ContextoLogIn};
