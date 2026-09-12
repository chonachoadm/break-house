import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useVideosService } from "../../services/videos.service";
import { useNavigate } from "react-router-dom";
import { useRole } from "../../contexts/AuthContext";

const VideoDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { getById, deleteVideo } = useVideosService();
    const role = useRole();
    const toEmbed = (url) => {
        if (!url) return "";
        let id = "";
        if (url.includes("youtu.be/")) {
            id = url.split("youtu.be/")[1];
        }
        if (url.includes("v=")) {
            id = url.split("v=")[1];
        }
        id = id.split("&")[0];
        return `https://www.youtube.com/embed/${id}`;
    };

    const [error, setError] = useState("");

    const handleDelete = () => {
        const confirmDelete = window.confirm(
            "¿Seguro que querés eliminar este video?"
        );
        if (!confirmDelete) return;
        deleteVideo(video._id)
            .then(() => {
                navigate("/videos");
            })
            .catch(err => {
                console.error(err);
                setError(err.message);
            });
    };

    const [video, setVideo] = useState(null);

    useEffect(() => {
        getById(id)
            .then(setVideo)
            .catch(err => console.error(err));
    }, [id, getById]);

    if (!video) return <p>Cargando...</p>;

    return (
        <div>
            <h2>{video.title}</h2>
            <div className="row justify-content-center">
                <div className="col-10 col-md-6">
                    <div className="ratio ratio-16x9 mx-auto my-4">
                        <iframe
                            src={toEmbed(video.link_yt)}
                            title={video.title}
                            allowFullScreen
                            className="w-100"
                        />
                    </div>
                </div>
            </div>

            <p><strong>Level:</strong> {video.level}</p>
            {role >= 2 && (
                <button
                    onClick={handleDelete}
                    className="mx-auto rounded bg-danger text-white py-1 px-2 d-flex align-items-center justify-content-center border-0"
                >
                    Eliminar video
                </button>
            )}
            {error && (
                <div>
                    {error}
                </div>
            )}
        </div>
    );
};

export default VideoDetail;