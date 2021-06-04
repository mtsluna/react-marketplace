import axios from "axios";


function returnAxiosInstance() {
    return axios.create({
        baseURL: "http://localhost:8080/api/marketplace"
    });
}
export function postProduct(storeId, requestData) {
    const axios = returnAxiosInstance();
    return axios.post("/products",requestData);
}
