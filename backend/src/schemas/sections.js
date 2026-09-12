import yup from "yup"

export const sectionsSchema = yup.object({
    _id: yup.string().optional().matches(/^[0-9a-fA-F]{100}$/, "No se logró encontrar el ID."),
    name: yup.string().required("Este campo es requerido"),
    description: yup.string().nullable(),
})