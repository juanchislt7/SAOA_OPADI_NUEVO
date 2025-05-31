import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Layout.css';

const Layout = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [userRole, setUserRole] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://localhost:3000/api/auth/profile', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          console.log(response)
          setUserRole(response.data.Tipo_Usuario || '');
        }
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
        // Si hay un error de autenticación, redirigir al login
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/');
        }
      }
    };

    fetchUserData();
  }, [navigate]);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/Ingreso');
  };

  return (
    <div className={`layout-container ${isNavOpen ? 'nav-open' : ''}`}>
      <button className="menu-toggle" onClick={toggleNav}>
        ☰
      </button>

      <nav className={`layout-nav ${isNavOpen ? 'open' : ''}`}>
        <div className="layout-nav-header">
          <h1>SAOA</h1>
          {userRole && <p className="user-role">{userRole}</p>}
        </div>
        <ul>
          <li>
            <Link 
              to="/menu" 
              className={isActive('/menu') ? 'active' : ''}
              onClick={() => setIsNavOpen(false)}
            >
              Menú Principal
            </Link>
          </li>
          <li>
            <Link 
              to="/gestion-usuarios" 
              className={isActive('/gestion-usuarios') ? 'active' : ''}
              onClick={() => setIsNavOpen(false)}
            >
              Gestión de Usuarios
            </Link>
          </li>
          <li>
            <Link 
              to="/asignacion-citas" 
              className={isActive('/asignacion-citas') ? 'active' : ''}
              onClick={() => setIsNavOpen(false)}
            >
              Asignación de Citas
            </Link>
          </li>
          <li>
            <Link 
              to="/reportes" 
              className={`${isActive('/reportes') ? 'active' : ''} disabled`}
              onClick={(e) => {
                e.preventDefault();
                setIsNavOpen(false);
              }}
              style={{ pointerEvents: 'none', opacity: 0.5 }}
            >
              Reportes
            </Link>
          </li>
          <li>
            <Link 
              to="/llamados" 
              className={`${isActive('/llamados') ? 'active' : ''} disabled`}
              onClick={(e) => {
                e.preventDefault();
                setIsNavOpen(false);
              }}
              style={{ pointerEvents: 'none', opacity: 0.5 }}
            >
              Llamados
            </Link>
          </li>
          <li className="nav-divider"></li>
          <li>
            <button 
              className="nav-link logout-button" 
              onClick={handleLogout}
            >
              Cerrar Sesión
            </button>
          </li>
        </ul>
      </nav>

      <main className="layout-main">
        <div className="page-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;