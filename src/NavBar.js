import React from 'react';
import './NavBar.css';
import LoginWithGoogle from './LoginWithGoogle'; // Asegúrate de importar el componente LoginWithGoogle y ajustar la ruta según tu estructura de archivos

const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="nav-container">
                <a href="/" className="nav-logo">
                    Ludini's<span>Reservas</span>
                </a>

                <ul className="nav-menu">
                    <li className="nav-item">
                        <a href="/" className="nav-links">
                            Inicio
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="/" className="nav-links">
                            Servicios
                        </a>
                    </li>
                    <li className="nav-item dropdown">
                        <span className="nav-links about">
                            Acerca
                        </span>
                        <div className="dropdown-content">
                            <p>Somos un grupo de chicos de la tecnicatura en Programación que creó esta página en base a las demandas sobre las reservas de salones en San Miguel de Tucumán.</p>
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <span className="nav-links contact">
                            Contacto
                        </span>
                        <div className="dropdown-content">
                            <a href="https://wa.me/qr/BBC74RIGG7A5K1">Whatsapp</a>
                            <a href="https://www.instagram.com/">Instagram</a>
                            <a href="https://www.facebook.com/">Facebook</a>
                        </div>
                    </li>
                </ul>

                {/* Aquí se agrega el botón de login con Google */}
                <LoginWithGoogle />
            </div>
        </nav>
    );
};

export default NavBar;
