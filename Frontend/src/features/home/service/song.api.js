import axios from "axios";
import dotenv from 'dotenv'
dotenv.config()


const api = axios.create({
    baseURL: process.env.BACKEND_URL,
    withCredentials: true
})


export async function getSong({ mood }) {
    const response = await api.get("/api/songs?mood=" + mood)
    console.log(response)
    return response.data
}