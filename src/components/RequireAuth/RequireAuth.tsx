import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "../../store/store";

function RequireAuth({ children }: { children: JSX.Element }) {
    let isLogged = useSelector<RootState>(state => state.auth.isLogged);
    let location = useLocation();

    if (!isLogged) {
        return <Navigate to="/auth/login" state={{from: location}} replace />
    }

    return children;
}

export default RequireAuth;