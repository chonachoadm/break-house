import { useEffect, useState } from "react";
import { useUsersService } from "../../services/users.service";
import { Link } from "react-router-dom";
import { useRole } from "../../contexts/AuthContext";



const Users = () => {
    const { getUsers } = useUsersService();
    const [users, setUsers] = useState([]);
    const role = useRole();
    useEffect(() => {
        getUsers()
            .then(data => setUsers(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h2>Usuarios</h2>
            {role >= 1 && (
                <div className="w-25 d-flex justify-content-center mx-auto my-4">
                    <div className="rounded bg-success py-2 px-4 d-flex align-items-center justify-content-center">
                        <Link to={"/users/new"} className="text-white text-decoration-none">
                            <p className="m-0">Crear usuario</p>
                        </Link>
                    </div>
                </div>
            )}

            <table className="w-100 my-4">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>

                        {role >= 1 && <th>Acciones</th>}
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td className="p-2 border">{user.name}</td>
                            <td className="p-2 border">{user.email}</td>
                            {role >= 1 && (
                                <td className="p-2 border d-flex justify-content-center gap-2">
                                    <div className="rounded bg-info py-1 px-2 d-flex align-items-center justify-content-center">
                                        <Link to={`/users/${user._id}`} className="text-black text-decoration-none"><p className="m-0">Detalle</p></Link>
                                    </div>
                                        <div className="rounded bg-warning py-1 px-2 d-flex align-items-center justify-content-center">
                                            <Link to={`/users/${user._id}/edit`} className="text-black text-decoration-none"><p className="m-0">Editar</p></Link>
                                        </div>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Users