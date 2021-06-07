import axios from "axios";


function returnAxiosInstance() {
    return axios.create({
        baseURL: "https://secret-everglades-98943.herokuapp.com/api/marketplace"
    });
}
export function getStores() {
    const axios = returnAxiosInstance();
    return axios.get("/stores");
}
export function createNewStore(){
    const axios = returnAxiosInstance();
    return axios.post("/stores");
}
