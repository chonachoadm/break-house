import { useNavigate } from "react-router-dom";
import { useToken } from "../contexts/AuthContext";

export function useApi() {

    const token = useToken()
    const navigate = useNavigate()

    const call = (uri, method, body) => {
        const options = {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        };
        if (body !== undefined) {
            options.body = JSON.stringify(body);
        }
        return fetch(`${import.meta.env.VITE_API_URL}${uri}`, options)
            .then(async (res) => {
                const data = await res.json();

                if (res.ok) {
                    return data;
                }

                if (res.status === 401 && token) {
                    navigate("/login");
                }

                throw new Error(data.message || "Ocurrió un error");
            })
    }

    return { call }
}