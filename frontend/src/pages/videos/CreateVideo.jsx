import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useVideosService } from "../../services/videos.service";
import { useSectionsService } from "../../services/sections.service";
import { useForm } from "react-hook-form";

const CreateVideo = () => {
    const navigate = useNavigate();
    const { createVideo } = useVideosService();
    const { getSections } = useSectionsService();

    const [sectionsList, setSectionsList] = useState([]);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ mode: "onChange" });

    useEffect(() => {
        getSections()
            .then(setSectionsList)
            .catch(console.error);
    }, []);

    const onSubmit = (data) => {
        createVideo(data)
            .then(() => {
                navigate("/videos");
            })
            .catch(err => {
                console.error(err.message);
            });
    };

    return (
        <div className="row justify-content-center">
            <h1 className="my-4">Crear Video</h1>
            <form className="col-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="d-flex flex-column align-items-start mb-4">
                    <label className="form-label" htmlFor="title">Título</label>
                    <input
                        className="form-control"
                        id="title"
                        {...register('title', {
                            required: "Este campo es obligatorio"
                        })}
                    />
                    {errors.title && (
                        <div>
                            {errors.title.message}
                        </div>
                    )}
                </div>
                <div className="d-flex flex-column align-items-start mb-4">
                    <label className="form-label" htmlFor="link_yt">Link de YouTube</label>
                    <input
                        className="form-control"
                        id="link_yt"
                        {...register('link_yt', {
                            required: "Este campo es obligatorio"
                        })}
                    />
                    {errors.link_yt && (
                        <div>
                            {errors.link_yt.message}
                        </div>
                    )}
                </div>
                <div className="d-flex flex-column align-items-start mb-4">
                    <label className="form-label" htmlFor="level">Nivel (beginner | intermediate | advanced)</label>
                    <input
                        className="form-control"
                        id="level"
                        {...register('level', {
                            required: "Este campo es obligatorio"
                        })}
                    />
                    {errors.level && (
                        <div>
                            {errors.level.message}
                        </div>
                    )}
                </div>
                <div className="d-flex flex-column align-items-start mb-4">
                    <label className="form-label" htmlFor="sectionId">Seleccionar categoría</label>
                    <select
                        className="form-select"
                        id="sectionId"
                        {...register('sectionId', {
                            required: "Debes seleccionar una categoría"
                        })}
                    >
                        <option value="">Seleccionar categoría</option>
                        {sectionsList.map(section => (
                            <option key={section._id} value={section._id}>
                                {section.name}
                            </option>
                        ))}
                    </select>
                    {errors.sectionId && (
                        <div>
                            {errors.sectionId.message}
                        </div>
                    )}
                </div>
                <button className="mx-auto mb-4 rounded bg-success py-2 px-4 d-flex text-white border-0">
                    Crear video
                </button>
            </form>
        </div>
    );
};

export default CreateVideo;