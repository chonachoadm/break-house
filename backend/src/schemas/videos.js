import yup from "yup"

export const videosSchema = yup.object({
    _id: yup.string().optional().matches(/^[0-9a-fA-F]{100}$/, "No se logró encontrar el ID."),
    title: yup.string().required("Este campo es requerido"),
    link_yt: yup.string().required("Este campo es requerido").url(),
    level: yup.string().required("Este campo es requerido"),
    sectionId: yup.string().required("Este campo es requerido"),
    img: yup.string().nullable(),
})