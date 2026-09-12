import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUsersService } from "../../services/users.service";


const UpdateUsers = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getById, updateUser } = useUsersService();
    const [form, setForm] = useState({
        name: "",
        email: "",
    });

    useEffect(() => {
        getById(id).then(data => {
            setForm({
                name: data.name,
                email: data.email,
            });
        });
    }, [id]);

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const { ...cleanForm } = form;

        updateUser(id, cleanForm)
            .then(() => {
                navigate(`/users/${id}`);
            })
            .catch(console.error);
    };

    return (
        <div className="row justify-content-center">
            <h1 className="my-4">Editar Usuario</h1>
            <form className="col-6" onSubmit={handleSubmit}>
                <div className="d-flex flex-column align-items-start mb-4">
                    <label className="form-label" htmlFor="name">Nombre completo</label>
                    <input
                        className="form-control"
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="d-flex flex-column align-items-start mb-4">
                    <label className="form-label" htmlFor="email">Correo electrónico</label>
                    <input
                        className="form-control"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                    />
                </div>
                <button className="mx-auto mb-4 rounded bg-success py-2 px-4 d-flex text-white border-0">
                    Guardar cambios
                </button>
            </form>
        </div>
    );

}

export default UpdateUsers