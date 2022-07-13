import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { selectLogginStatus } from "../../store/authSlice";
import { RootState } from "../../store/store";

function RequireAuth({ children }: { children: JSX.Element }) {
    let isLogged = useSelector<RootState>(selectLogginStatus);
    let location = useLocation();

    if (isLogged === false) {
        return <Navigate to="/auth/login" state={{from: location}} replace />
    }

    return children;
}

export default RequireAuth;