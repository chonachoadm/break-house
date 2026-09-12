import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

const USER = 0;
const ADMIN = 1;
const SUPERADMIN = 2;

export const AuthContext = createContext()

export function useSession() {
    return useContext(AuthContext) || {}
}

export function useEmail() {
    const { email } = useSession()
    return email
}

export function useLogin() {
    const { login } = useSession()
    return login
}

export function useLogout() {
    const { logout } = useSession()
    return logout
}

export function useToken() {
    const { token } = useSession()
    return token
}

export function useRole() {
    const token = useToken();
    try {
        const payload = jwtDecode(token)

        return payload?.role || USER;
    } catch (error) {
        return USER;
    }
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("session")))
    const [token, setToken] = useState(localStorage.getItem("token"))

    const onLogin = (jwt, usuario) => {
        localStorage.setItem("session", JSON.stringify({ usuario }))
        localStorage.setItem("token", jwt)
        setUser(usuario)
        setToken(jwt)
    }

    const onLogout = () => {
        localStorage.clear()
        setUser(null)
        setToken(null)
    }

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated, login: onLogin, logout: onLogout }} >
            {children}
        </AuthContext.Provider>
    )
}
