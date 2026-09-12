import { useEffect, useState } from "react";
import { useVideosService } from "../../services/videos.service";
import { useSectionsService } from "../../services/sections.service";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import editIcon from "../../assets/icons/edit-icon.webp"
import { useRole } from "../../contexts/AuthContext";

const Videos = () => {
    const { getVideos, getBySection } = useVideosService();
    const [videos, setVideos] = useState([]);
    const { getSections, deleteSection } = useSectionsService();
    const [sectionList, setSectionList] = useState([]);
    const [selectedSection, setSelectedSection] = useState("");
    const navigate = useNavigate();
    const role = useRole();

    const handleDeleteSection = (id) => {
        const confirmDelete = window.confirm(
            "¿Seguro que querés eliminar esta categoría?"
        );
        if (!confirmDelete) return;
        deleteSection(id)
            .then(() => {
                navigate("/videos");
            })
            .catch(err => {
                console.error(err);
            });
    };

    useEffect(() => {
        getSections()
            .then(data => setSectionList(data))
            .catch(err => console.error(err));
    }, []);
    useEffect(() => {
        if (selectedSection) {
            getBySection(selectedSection).then(setVideos);
        } else {
            getVideos().then(setVideos);
        }
    }, [selectedSection]);

    return (
        <div className="px-4">
            <h2>Clases</h2>
            <div className="d-flex flex-wrap gap-2 justify-content-center">
                <button
                    onClick={() => setSelectedSection(null)}
                    className="rounded border-3 border-primary bg-transparent"
                >
                    Todas
                </button>

                {sectionList.map(section => (
                    <div key={section._id} className="d-flex rounded border border-3 border-primary gap-2 px-2">
                        <button
                            onClick={() => setSelectedSection(section._id)}
                            className="p-0 rounded border-0 bg-transparent"
                        >
                            {section.name}
                        </button>
                        {role >= 1 && (
                            <>
                                <Link className="d-flex align-items-center justify-content-center" to={`/sections/${section._id}/edit`}><img className="w-50" src={editIcon} alt="Editar categoría" /></Link>
                                <button
                                    onClick={() => handleDeleteSection(section._id)}
                                    className="rounded border-0 bg-transparent p-0 text-danger"
                                >
                                    <strong>X</strong>
                                </button>
                            </>
                        )}
                    </div>
                ))}
                {role >= 1 && (
                    <div className="d-flex align-items-center rounded bg-primary gap-2 px-2">
                        <Link to="/sections/new" className="text-white text-decoration-none"><p className="m-0">Categoría +</p></Link>
                    </div>
                )}
            </div>
            {role >= 1 && (
                <div className="w-25 d-flex justify-content-center mx-auto my-4">
                    <div className="rounded bg-success w-50 py-1 px-2 d-flex align-items-center justify-content-center">
                        <Link to={"/videos/new"} className="text-white text-decoration-none">
                            <p className="m-0">Crear video</p>
                        </Link>
                    </div>
                </div>
            )}

            <table className="w-100 my-4">
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Nivel</th>
                        <th>YouTube</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {videos.map(video => (
                        <tr key={video._id}>
                            <td className="p-2 border">{video.title}</td>
                            <td className="p-2 border">{video.level}</td>
                            <td className="p-2 border">
                                <a href={video.link_yt} target="_blank">Ir a YouTube</a>
                            </td>
                            <td className="p-2 border d-flex gap-2 justify-content-center">
                                <div className="rounded bg-info py-1 px-2 d-flex align-items-center justify-content-center">
                                    <Link to={`/videos/${video._id}`} className="text-black text-decoration-none"><p className="m-0">Detalle</p></Link>
                                </div>
                                {role >= 1 && (
                                    <div className="rounded bg-warning py-1 px-2 d-flex align-items-center justify-content-center">
                                        <Link to={`/videos/${video._id}/edit`} className="text-black text-decoration-none"><p className="m-0">Editar</p></Link>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Videos;