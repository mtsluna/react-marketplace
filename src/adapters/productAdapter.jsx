import axios from "axios";


function returnAxiosInstance() {
    return axios.create({
        baseURL: "https://secret-everglades-98943.herokuapp.com/api/marketplace"
    });
}
export function postProduct(storeId, requestData) {
    const axios = returnAxiosInstance();
    return axios.post("/products",requestData);
}
