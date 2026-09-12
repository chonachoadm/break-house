import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useUsersService } from "../../services/users.service";
import { useNavigate } from "react-router-dom";
import { useRole } from "../../contexts/AuthContext";


const UserDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { getById, updateUser, deleteUser } = useUsersService();
    const role = useRole();

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [user, setUser] = useState(null);
    const [form, setForm] = useState({
        role: "",
    });

    useEffect(() => {
        getById(id)
            .then(data => {
                setUser(data);
                setForm({
                    role: data.role,
                });
            })
            .catch(err => console.error(err))
    }, [id]);

    const handleChange = (event) => {
        setSuccess("")
        const newRole = Number(event.target.value);
        setForm({
            role: newRole
        });
        updateUser(id, {
            role: newRole
        })
            .then(() => {
                setSuccess("Permisos actualizados");
                console.log("Permisos actualizados.");
            })
            .catch(console.error);
    };

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const { ...cleanForm } = form;

    //     updateUser(id, cleanForm)
    //         .then(() => {
    //             navigate(`/users/${id}`);
    //         })
    //         .catch(console.error);
    // };

    const handleDelete = () => {
        const confirmDelete = window.confirm(
            "¿Seguro que querés eliminar este usuario?"
        );
        if (!confirmDelete) return;
        deleteUser(id)
            .then(() => {
                navigate("/users");
            })
            .catch(err => {
                console.error(err);
                setError(err.message);
            });
    };

    if (!user) return <p>Cargando...</p>;

    return (
        <div>
            <div className="mb-4">
                <h2>{user.name}</h2>
                <p><strong>Email:</strong> {user.email}</p>
                <small><strong>ID:</strong> <em>{user._id}</em></small>
            </div>
            {role >= 2 && (
                <>
                    <div className="d-flex flex-column align-items-start mx-auto mb-4 w-50">
                        <label className="form-label" htmlFor="role">Otorgar permisos</label>
                        <select 
                            className="form-select"
                            name="role" 
                            id="role" 
                            onChange={handleChange}
                            value={form.role ?? 0}
                        >
                            <option value="0">Usuario</option>
                            <option value="1">Admin</option>
                            <option value="2">Superadmin</option>
                        </select>
                    </div>
                    {success && (
                        <div className="w-50 mx-auto alert alert-success">
                            {success}
                        </div>
                    )}
                    <button 
                        onClick={handleDelete}
                        className="mx-auto rounded bg-danger text-white py-1 px-2 d-flex align-items-center justify-content-center border-0"
                        >
                        Eliminar usuario
                    </button>
                </>
            )}
            {error && (
            <div>
                {error}
            </div>
            )}
        </div>
    );
}

export default UserDetail