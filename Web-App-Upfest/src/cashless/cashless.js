import {AvisosPagamentosPendentes, PagamentosPendentes} from "../elementos/elementos";
import "./cashless.scss"
import Carregamento from "./carregamento";

function Cashless(props) {
    return (
        <div className={"cashless"}>
            <AvisosPagamentosPendentes/>

            <div className={"saldoActual"}>
                <h1>78,50€</h1>
                <h3>Saldo Actual</h3>
            </div>

            <h3>Efectuar carregamento</h3>
            <Carregamento/>

            <h3>Pagamentos pendentes</h3>
            <PagamentosPendentes/>

            <h3>Movimentos</h3>
            <div className="lista lista-movimento-gasto">
                <div className="color-block">
                    <div className="bg-img bg-img-pagamento"></div>

                    <div className="info-pagamento">
                        <h1>- 12,00€</h1>
                        <h1>02/04/2023 17:39</h1>
                    </div>

                    <div className="rectangulo-preco">
                        <span> 78,50 € </span>
                    </div>
                </div>
            </div>

            <div className="lista detalhes-compra">
                <div className="color-block">
                    <div className="linha-pagamento">
                        <h1>1 x COXA-Box 20</h1>
                        <h1>Valor unit. 12€</h1>
                    </div>
                </div>
            </div>

            <div className="lista lista-movimento-gasto">
                <div className="color-block">
                    <div className="bg-img bg-img-pagamento"></div>

                    <div className="info-pagamento">
                        <h1>- 8,50€</h1>
                        <h1>02/04/2023 17:39</h1>
                    </div>

                    <div className="rectangulo-preco">
                        <span> 90,50 € </span>
                    </div>
                </div>
            </div>

            <div className="lista detalhes-compra">
                <div className="color-block">
                    <div className="linha-pagamento">
                        <h1>1 x HAVANA CLUB</h1>
                        <h1>Valor unit. 8,5€</h1>
                    </div>
                </div>
            </div>

            <div className="lista lista-movimento-gasto">
                <div className="color-block">
                    <div className="bg-img bg-img-pagamento"></div>

                    <div className="info-pagamento">
                        <h1>- 1,00€</h1>
                        <h1>02/04/2023 17:39</h1>
                    </div>

                    <div className="rectangulo-preco">
                        <span> 99,00 € </span>
                    </div>
                </div>
            </div>

            <div className="lista detalhes-compra">
                <div className="color-block">
                    <div className="linha-pagamento">
                        <h1>1 x COPO SPIRITS</h1>
                        <h1>Valor unit. 1€</h1>
                    </div>
                </div>
            </div>

            <div className="lista lista-movimento-carregado">
                <div className="color-block">
                    <div className="bg-img bg-img-pagamento"></div>

                    <div className="info-pagamento">
                        <h1>+ 100,00€</h1>
                        <h1>02/04/2023 15:15</h1>
                    </div>

                    <div className="rectangulo-preco">
                        <span> 100,00 € </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cashless;