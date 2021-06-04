import axios from "axios";


function returnAxiosInstance() {
    return axios.create({
        baseURL: "http://localhost:8080/api/marketplace"
    });
}
export function postUser(userId,userData) {
    const axios = returnAxiosInstance();
    return axios.post("/users/"+userId ,userData);
}
export function getUsers(){
    const axios = returnAxiosInstance();
    return axios.get("/users");
}
export async function getUserById(userId){
    const axios = returnAxiosInstance();
    return await axios.get("/users/"+userId);
}
export function updateUserById(userId, userData){
    const axios = returnAxiosInstance();
    return axios.put("/users/"+userId, userData);
}