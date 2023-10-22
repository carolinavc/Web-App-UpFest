import './App.scss';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Navegacao from "./navegacao/navegacao";

import Splash from "./entrada/splash/splash";
import LogIn from "./entrada/login/login";

import Inicio from "./separadores/inicio/inicio";
import Pesquisa from "./separadores/pesquisa/pesquisa";
import Bilhetes from "./separadores/bilhetes/bilhetes";
import Pessoal from "./separadores/pessoal/pessoal";

import ProvideLogIn from "./entrada/login/ContextLogIn";
import ProviderFavoritos from "./favoritos/ContextoFavoritos";
import DetalhesArtista from "./artistas/DetalhesArtista";
import DetalhesFestival from "./festivais/DetalhesFestival";
import Cashless from "./cashless/cashless";

function App() {
    return (
        <ProvideLogIn>
                <BrowserRouter>
                    <div className={"App"}>
                        <Switch>
                            <Route exact path="/" component={Splash}/>
                            <Route path="/login" component={LogIn}/>

                            <ProviderFavoritos>
                            <Route path="/inicio" component={Inicio}/>
                            <Route path="/pesquisa" component={Pesquisa}/>
                            <Route path="/bilhetes" component={Bilhetes}/>
                            <Route path="/pessoal" component={Pessoal}/>

                            <Route path="/artistas/:id_artista/detalhes" component={DetalhesArtista}/>
                            <Route path="/evento/:id_evento/detalhes" component={DetalhesFestival}/>
                            <Route path="/cashless/:id_evento/saldo" component={Cashless}/>
                            </ProviderFavoritos>
                        </Switch>
                        <Navegacao/>
                    </div>
                </BrowserRouter>
        </ProvideLogIn>
    )
}

export default App;