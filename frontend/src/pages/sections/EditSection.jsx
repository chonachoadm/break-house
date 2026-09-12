import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSectionsService } from "../../services/sections.service";

const EditSection = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getById, updateSection } = useSectionsService();
    const [form, setForm] = useState({
        name: "",
        description: "",
    });

    useEffect(() => {
        getById(id).then(data => {
            setForm({
                name: data.name,
                description: data.description,
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

        updateSection(id, cleanForm)
            .then(() => {
                navigate(`/videos`);
            })
            .catch(console.error);
    };

    return (
        <div className="row justify-content-center">
            <h1 className="my-4">Editar categoría</h1>
            <form className="col-6" onSubmit={handleSubmit}>
                <div className="d-flex flex-column align-items-start mb-4">
                    <label className="form-label" htmlFor="name">Nombre de la categoría</label>
                    <input
                        className="form-control"
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="d-flex flex-column align-items-start mb-4">
                    <label className="form-label" htmlFor="description">Breve descripción</label>
                    <textarea
                        className="form-control"
                        name="description"
                        id="description"
                        onChange={handleChange}
                        value={form.description}
                    >
                    </textarea>
                </div>
                <button className="mx-auto mb-4 rounded bg-success py-2 px-4 d-flex text-white border-0">Guardar</button>
            </form>
        </div>
    )
}

export default EditSection;