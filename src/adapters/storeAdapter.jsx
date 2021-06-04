import axios from "axios";


function returnAxiosInstance() {
    return axios.create({
        baseURL: "http://localhost:8080/api/marketplace"
    });
}
export function getStores() {
    const axios = returnAxiosInstance();
    return axios.get("/stores");
}
