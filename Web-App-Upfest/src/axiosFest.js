import axios from "axios";

const axiosFest = axios.create({
    baseURL: "https://upfest.site",
    headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVwc2sxNDQwOTcxOUBpc2N0ZS1pdWwucHQiLCJpYXQiOjE2OTYwMjgyMzYsImV4cCI6MTcyNzU2NDIzNn0.LczjFoRmwOLd8Rjvp_6nWeyjTlLl5PPHFasmm6IrDqA', // colocar entre os [] o token que o professor me enviar
    },
})
export default axiosFest;
