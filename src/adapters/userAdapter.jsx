import axios from "axios";


function returnAxiosInstance() {
    return axios.create({
        baseURL: "http://localhost:8080/api/marketplace"
    });
}
export function postUser(requestData) {
    const axios = returnAxiosInstance();
    return axios.post("/users",requestData);
}
export function getUsers(){
    const axios = returnAxiosInstance();
    return axios.get("/users");
}