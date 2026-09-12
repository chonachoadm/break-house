import { Navigate } from "react-router-dom"
import { useRole, useToken } from "../contexts/AuthContext"

const ProtectedRoute = ({ element, role }) => {
    // const token = useToken();
    const session = JSON.parse( localStorage.getItem("session"))
    const roleUser = useRole()

    if( !session ) return <Navigate to="/login" replace />;
    if ( !(roleUser >= role)) return <Navigate to="/" replace />;

    return element;
    
    ;

}

export default ProtectedRoute