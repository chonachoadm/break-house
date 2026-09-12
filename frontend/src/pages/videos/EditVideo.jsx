import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useVideosService } from "../../services/videos.service";
import { useSectionsService } from "../../services/sections.service";

const EditVideo = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getById, updateVideo } = useVideosService();
    const { getSections } = useSectionsService();
    const [sectionsList, setSectionsList] = useState([]);
    const [form, setForm] = useState({
        title: "",
        link_yt: "",
        level: "",
        sectionId: ""
    });

    useEffect(() => {
        getSections().then(setSectionsList);

        getById(id).then(data => {
            setForm({
                title: data.title,
                link_yt: data.link_yt,
                level: data.level,
                sectionId: data.sectionId
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

        updateVideo(id, cleanForm)
            .then(() => {
                navigate(`/videos/${id}`);
            })
            .catch(console.error);
    };

    return (
        <div className="row justify-content-center">
            <h1 className="my-4">Editar Video</h1>
            <form className="col-10 col-md-6" onSubmit={handleSubmit}>
                <div className="d-flex flex-column align-items-start mb-4">
                    <label className="form-label" htmlFor="title">Título</label>
                    <input
                        className="form-control"
                        id="title"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                    />
                </div>
                <div className="d-flex flex-column align-items-start mb-4">
                    <label className="form-label" htmlFor="link_yt">Link de YouTube</label>
                    <input
                        className="form-control"
                        id="link_yt"
                        name="link_yt"
                        value={form.link_yt}
                        onChange={handleChange}
                    />
                </div>
                <div className="d-flex flex-column align-items-start mb-4">
                    <label className="form-label" htmlFor="level">Nivel</label>
                    <input
                        className="form-control"
                        id="level"
                        name="level"
                        value={form.level}
                        onChange={handleChange}
                    />
                </div>
                <div className="d-flex flex-column align-items-start mb-4">
                    <label className="form-label" htmlFor="sectionId">Seleccionar categoría</label>
                    <select
                        className="form-select"
                        id="sectionId"
                        name="sectionId"
                        value={form.sectionId}
                        onChange={handleChange}
                    >
                        <option value="">Seleccionar categoría</option>
                        {sectionsList.map(section => (
                            <option key={section._id} value={section._id}>
                                {section.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button className="mx-auto mb-4 rounded bg-success py-2 px-4 d-flex text-white border-0">
                    Guardar cambios
                </button>
            </form>
        </div>
    );
}

export default EditVideo;