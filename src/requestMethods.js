import axios from "axios"

const BASE_URL = "http://localhost:7000/api/"
// const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjYwNDdjZGNmZDZlODZlOGY3NWYxMyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MDYxMDg3NSwiZXhwIjoxNjgxMjE1Njc1fQ.B2lY2lCI7odmhgh_rOKVxDOpU2G3NVIxrNWqiOCprm8"

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;



export const publicRequest = axios.create({
    baseURL: BASE_URL,
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers:{token: `Bearer ${TOKEN}`},
})