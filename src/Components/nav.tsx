import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
    const handleLogout = () => {
        // Local storage'daki tüm verileri temizle
        localStorage.clear();

        // Kullanıcıyı çıkış sayfasına yönlendir
        // Örnek olarak anasayfaya yönlendiriyoruz
        window.location.href = "/Login"; // veya istediğiniz bir başka sayfaya yönlendirebilirsiniz
    };

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">
                    Home
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarCollapse"
                    aria-controls="navbarCollapse"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div>
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                        <li className="nav-item">
                            <Link to="/login" className="nav-link active" aria-current="page">
                                Login
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/register" className="nav-link active" aria-current="page">
                                Register
                            </Link>
                        </li>
                        <button style={{ marginLeft:10, fontSize: '16px' }}
                        className="btn btn-danger"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                    </ul>
                    
                </div>
            </div>
        </nav>
    );
};

export default Nav;