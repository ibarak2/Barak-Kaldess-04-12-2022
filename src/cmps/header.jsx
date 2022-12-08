import { useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate, } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Header = () => {

    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (location.pathname === '/') navigate('/home')
    }, [])

    return (
        <div className="header">
            <nav className="main-nav">
                <Link to="/home" className="item logo">Weather App</Link>
                <div>
                    <NavLink to="/home" className="item">Home</NavLink>
                    <NavLink to="/favorites" className="item">Favorites</NavLink>
                </div>
            </nav>
            <ToastContainer />
        </div>
    )
}