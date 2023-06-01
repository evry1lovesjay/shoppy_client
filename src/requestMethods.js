import axios from "axios"

// const BASE_URL = "http://localhost:7000/api/"
// const BASE_URL = "https://shoppy-api-m4i9.onrender.com/api/"
// const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjYwNDdjZGNmZDZlODZlOGY3NWYxMyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MDYxMDg3NSwiZXhwIjoxNjgxMjE1Njc1fQ.B2lY2lCI7odmhgh_rOKVxDOpU2G3NVIxrNWqiOCprm8"


const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;


const API_URL = process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API_URL_PROD
    : process.env.REACT_APP_API_URL_DEV;
    


export const publicRequest = axios.create({
    baseURL: `${API_URL}/api/`,
})

export const userRequest = axios.create({
    baseURL: `${API_URL}/api/`,
    headers:{token: `Bearer ${TOKEN}`},
})