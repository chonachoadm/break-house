import yup from "yup"

export const loginSchema = yup.object({
    email: yup.string().email().typeError("Debe ser un correo válido").required(),
    password: yup.string().required()
})

export const registerSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().typeError("Debe ser un correo válido").required(),
    password: yup.string().required().min(6, "La contraseña debe tener al menos 6 caracteres"),
    passwordConf: yup.string().oneOf([yup.ref("password")], "Las contraseñas deben ser iguales").required(),
})