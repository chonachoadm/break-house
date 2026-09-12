import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"

function Navbar() {
    const { isAuthenticated, logout } = useAuth();
    return (
        <nav className="d-flex justify-content-around my-4">
            <Link to="/" className="text-decoration-none text-black">Home</Link>
            <Link to="/videos" className="text-decoration-none text-black">Clases</Link>
            <Link to="/users" className="text-decoration-none text-black">Usuarios</Link>

            {
                isAuthenticated ? (
                    <button onClick={logout} className="bg-transparent border-0">Logout</button>
                ) : (
                    <>
                        <Link to="/login" className="text-decoration-none text-black">Login</Link>
                        <Link to="/register" className="text-decoration-none text-black">Registro</Link>
                    </>
                )
            }
        </nav>
    );
}

export default Navbar;