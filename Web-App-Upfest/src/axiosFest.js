import axios from "axios";

const axiosFest = axios.create({
    baseURL: "https://upfest.site",
    headers: {
        'Authorization': [], // colocar entre os [] o token que o professor me enviar
    },
})
export default axiosFest;
