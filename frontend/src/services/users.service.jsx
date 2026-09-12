import { useApi } from "./api.service";

export const useUsersService = () => {
    const { call } = useApi()

    const login = (credentials) => call("/auth/login", "POST", credentials)
    const register = (name, email, password, passwordConfirm) => call("/auth/register", "POST", {
        name: name,
        email: email,
        password: password,
        passwordConf: passwordConfirm,
        role: "0"
    })
    const getUsers = () => call("/users")
    const getById = (id) => call(`/users/${id}`, "GET")
    const createUser = (user) => call("/users", "POST", user)
    const updateUser = (id, user) => call(`/users/${id}`, "PATCH", user)
    const deleteUser = (id) => call(`/users/${id}`, "DELETE")

    return { login, register, getUsers, getById, createUser, updateUser, deleteUser }
}