import axios from "axios";

const axiosFest = axios.create({
    baseURL: "https://upfest.site",
    headers: {
        'Authorization': [],
    },
})
export default axiosFest;
