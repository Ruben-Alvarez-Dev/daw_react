import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

const ProtectedRoute = ({ children }) => {
    const { user } = useUser();
    const location = useLocation();

    if (!user) {
        // Redirige a login guardando la ruta intentada
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;