import axios from "axios";
const apiUrl = import.meta.env.VITE_BACKEND_URL

const api = axios.create({
    baseURL: apiUrl,
    withCredentials: true
})


export async function getSong({ mood }) {
    const response = await api.get("/api/songs?mood=" + mood)
    console.log(response)
    return response.data
}